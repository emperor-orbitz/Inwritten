import { Editor } from 'slate-react'
import { Value } from 'slate'
import React from 'react'
import initialValue from './value'

import { Button, Icon, Modal, Input, Grid } from 'semantic-ui-react'
import Html from "slate-html-serializer"
import { DEFAULT_NODE, schema, rules, renderMark, renderBlock, onKeyDown } from "./editor-rules";
import "../../../Resources/styles/editor.scss";
//import EditorPanel from '../../../backup-editor';





class EditorPanel extends React.Component {


  state = {
    value: Value.fromJSON(initialValue),
    keys: '',
    h: '',
    openMedia: false,
    mediaInfo: '',
    image_url: '',
    modal1display: 'block',
    modal2display: 'none',
    modalToggle: 'grid layout',
    img_submit_inactive: true,
    invalid_file: false,
    link_insert_display: 'none',
    embedurl: '',
    activeBlock: ""

  }



get exposeEditorValue(){
  return window.editor;
}

get exposeHTMLEditorValue(){

    const html = new Html({ rules });
    var HTMLValue = html.serialize(window.editor);
    console.log(HTMLValue);
    return HTMLValue;
}


 onChange = ({ value }) => {

  this.setState({ value })
  window.editor = value

}



// EDITOR HANDLERS, ONKEYDOWN, ONCLICKMARK, ONCLICKBLOCK,ETC
onClickMark = (event, type) => {
  event.preventDefault()
  this.editor.toggleMark(type)
}




onClickBlock = (event, type) => {
  event.preventDefault()
  const { editor } = this
  const { value } = editor
  const { document } = value
  console.log(value, editor, document)

  // Handle everything but list buttons.
  if (type !== 'bulleted-list' && type !== 'numbered-list') {
    const isActive = this.hasBlock(type)
    const isList = this.hasBlock('list-item')

    if (isList) {
      editor
        .setBlocks(isActive ? DEFAULT_NODE : type)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    }

    else {
      editor.setBlocks(isActive ? DEFAULT_NODE : type)
        .unwrapBlock(type)
    }
  }


  else {
    // Handle the extra wrapping required for list buttons.
    const isList = this.hasBlock('list-item')
    const isType = value.blocks.some(block => {
      return !!document.getClosest(block.key, parent => parent.type === type)
    })

    if (isList && isType) {
      editor
        .setBlocks(DEFAULT_NODE)
        .unwrapBlock('bulleted-list')
        .unwrapBlock('numbered-list')
    } else if (isList) {
      editor
        .unwrapBlock(
          type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
        )
        .wrapBlock(type)
    } else {
      editor.setBlocks('list-item').wrapBlock(type)
    }
  }
}



//RENDERMARK BUTTON RENDERER
 renderMarkButton = (type, icon) => {
  const isActive = this.hasMark(type)

  return (
    <Button name={icon}
    size="mini"
    icon={icon}
    onMouseDown={event => this.onClickMark(event, type)}
    className='editor-editorButtons' active={isActive} />
  )
}



//RENDERBLOCK BUTTON RENDERER

renderBlockButton = (type, icon) => {
  let isActive = this.hasBlock(type);

  if (type != 'image') {
    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
        <Button name={icon}
        size="mini"
        icon={icon}
         onMouseDown={event => this.onClickBlock(event, type)}
        className='editor-editorButtons' active={isActive} />
    )
  }

  else
    return (
    <Button name={icon}
      size="mini"
      icon={icon}
      className='editor-editorButtons'
      onClick={this.showMedia.bind(this, ['image'])}
      />

    )

}

//HAS MARK? FUNCTION

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }


  
//HAS BLOCK? FUNCTION

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

 
// EDITOR REFERENCE
  ref = editor => {
    this.editor = editor
  }



  showMedia = (media_type) => {

    this.setState({ openMedia: true, mediaInfo: media_type })

  }



  render() {

    return (
      <div style={{width:"85%", margin:'auto', top:0, left:'250px', bottom:0, right:0}}>
        
        
          {this.state.mediaInfo == 'image' ? (
          <Modal dimmer={true} size='mini' open={this.state.openMedia} >

            <Modal.Header><Icon size='small' style={{ cursor: 'pointer', color: 'rgb(3, 68, 94)' }} title='Use hashstack gallery or insert image URL' name={this.state.modalToggle} /> Insert new {this.state.mediaInfo} {this.state.deleteArticleName}</Modal.Header>

            <Modal.Content style={{ background: "url('src/img/tech.png') no-repeat right top", padding: '0px' }}  >
              <div className='modalContent' style={{ display: this.state.modal1display }} >

                <p style={{ display: this.state.invalid_file == true ? 'block' : 'none', color: 'red' }} >Unacceptable image format </p>
                <br />
                <p>{'Select ' + this.state.mediaInfo}</p>
                <Input size='mini' type='file' onChange={this.handle_image.bind(this)} id='input_file' style={{ width: '70%', borderRadius: 'none' }} />


                <p>{'Insert ' + this.state.mediaInfo + 'URL'}</p>
                <Input size='small' type='text' control='input' id="input_url" onChange={this.handle_image.bind(this)} style={{ width: '70%', borderRadius: 'none' }} />

                <p>Insert Caption </p>
                <input id='caption' type='text' label='Insert caption (optional)' style={{
                  width: '70%', height: '35px',
                  border: 'none'
                }} onChange={() => { document.getElementById('caption').style.borderBottom = '3px solid teal' }} />
              </div>


            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => { this.setState({ openMedia: false, img_submit_inactive: true, image_url: '' }) }} icon='close' labelPosition='right' content='Close' size='tiny' />
              <Button onClick={() => { this.sign_image() }} color='blue' icon='arrow right' labelPosition='right' content='Insert' size='tiny' disabled={this.state.img_submit_inactive} />
            </Modal.Actions>


          </Modal>)
            :
            (<Modal dimmer={true} size='mini' open={this.state.openMedia} >
              <Modal.Header> <Icon name='close' link onClick={() => this.setState({ openMedia: false })} /> Insert EMBED Url </Modal.Header>
              <Modal.Content>
                <Input type='text' id='link_insert' placeholder='insert url &amp; click enter' style={{ width: '100%', background: 'white' }}>
                  <input value={this.state.embedurl} onChange={this.embedVideoItem.bind(this)} onKeyDown={this.embedVideoItemClick.bind(this)} />
                  <Icon name='paper plane outline' />

                </Input>
              </Modal.Content>
            </Modal>
            )
          }

        





        <div className='editor-buttons' >

          {this.renderMarkButton('bold', 'bold')}
          {this.renderMarkButton('italic', 'italic')}
          {this.renderMarkButton('underline', 'underline')}
          {this.renderMarkButton('code', 'code')}
          {this.renderMarkButton('strikethrough', 'strikethrough')}

          {this.renderBlockButton('align-right', 'align right')}
          {this.renderBlockButton('heading-one', 'heading')}
          {this.renderBlockButton('heading-two', 'h square')}
          {this.renderBlockButton('block-quote', 'quote right')}
          {this.renderBlockButton('numbered-list', 'ordered list')}
          {this.renderBlockButton('bulleted-list', 'unordered list')}
          {this.renderBlockButton('image', 'image')}

        </div>


        <div style={{padding:"5px 10px", margin:"5px 10px"}}>
          <Editor
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={onKeyDown}
            renderBlock={renderBlock}
            renderMark={renderMark}
            schema={schema}
            role="textbox"
            className="editor"

          />
        </div>
      </div>
    )
  }










//SET IMAGE BLOCK IN EDITOR

  sign_image() {

    let caption = document.getElementById('caption').value;
    var status = this.editor
      .setBlocks({
        type: 'image',
        isVoid: true,
        data: {
          src: this.state.image_url,
          className: 'editor-images',
          caption: caption
        }
      })

    this.onChange(status);
    this.setState({ openMedia: false });

  }



//READ FILE STREAM

  readFile(doc) {
    return new Promise( resolve => {
      var reader = new FileReader();

      reader.readAsDataURL(doc);

      reader.onloadend =  () =>{
        resolve(reader.result);
      }
    })

  }



  //CONTROL STATE ON SELECT IMAGE(URL/FILE)

  handle_image(ev) {
    ev.preventDefault();

    //test if its jpg or png or gif
    var img_regexp = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
    if (ev.target.type == 'file') {
      var { name } = ev.target.files[0];

      if (img_regexp.test(name)) {
        this.readFile(ev.target.files[0]).then( result => {

          this.state.image_url = result;
          this.setState({ img_submit_inactive: false, invalid_file: false })

        })

      }
      else 
        this.setState({ img_submit_inactive: true, invalid_file: true });
      

    }
    else if (ev.target.type == 'text') {

      if (img_regexp.test(ev.target.value)) {

        this.state.image_url = ev.target.value;
        this.setState({ img_submit_inactive: false, invalid_file: false });
      }

      else { /*alert('invalid image') */
        this.setState({ img_submit_inactive: true, invalid_file: true });
      }

    }


    //else
    else 
      this.setState({ img_submit_inactive: true, invalid_file: true })
      return null;
    

  }




//INSERT EMBED URL

  embedVideoItem(ev) {
    this.setState({ embedurl: ev.target.value });
  }




//INSERT <EMBED> BLOCK IN EDITOR
  embedVideoItemClick(ev) {

    if (ev.key == 'Enter') {
      var status = this.editor
        .insertBlock({
          type: 'embedvideo',
          isVoid: true,
          data: {
            src: this.state.embedurl,
            className: 'editor-images',

          }
        })
      this.setState({ openMedia: false })
      this.onChange(status);
    }

    return null;

  }























}

/**
 * Export.
 */

export default EditorPanel
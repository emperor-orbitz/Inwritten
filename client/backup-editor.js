import React, { Component } from 'react';
import { Modal, Input, Icon, Button, Grid } from 'semantic-ui-react';
import '../../../Resources/styles/editor.scss';
import sample_image from '../../../Resources/images/n2.png';
import { Editor } from 'slate-react';
import { Value, Block } from 'slate';
import Html from 'slate-html-serializer';
import initialValue from '../../Dashboard/value';


/**
 *  EDITOR SETUP SETTINGS BEGINS HERE
 * 
 */

const BLOCK_TAGS = {
    blockquote: 'blockquote',
    p: 'paragraph',
    code: 'code',
    img: 'image',
    iframe: 'embedvideo',
    ol: 'ol',
    li: 'li',
    p: 'align-right',
    p: 'align-left',
    //embed:'embed'
}

// Add a dictionary of mark tags.
const MARK_TAGS = {
    em: 'italic',
    b: 'bold',
    u: 'underline',
    del: 'strikethrough',
    h2: 'h',

    code: 'code',

}

const INLINE_TAGS = {
    code: 'code',
    a: 'linkify',




}




const rules = [
    {
        deserialize(el, next) {
            // console.log('i wanmt to deserailize okay', 'el:',el  ,'next:', next() )

            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'block',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                        src: el.getAttribute('src')
                    },
                    nodes: next(el.childNodes),
                }
            }
        },

        serialize(obj, children) {

            if (obj.object == 'block') {
                switch (obj.type) {
                    case 'code':
                        return (<code className="editor-code">{children}</code>)

                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>

                    case 'image':
                        return (< img src={obj.data.get('src')} className={obj.data.get('className')} />)

                    case 'embedvideo':
                        return ( <div>
                            <iframe src={obj.data.get('src')} className={obj.data.get('className')} />
                              </div>
                              )

                    case 'li':
                        return (<li >{children}</li>)

                    case 'ol':
                        return (<ol type='i'>{children}</ol>)

                    case 'align-right':

                        return (<p className='editor-alignright'>{children}</p>)

                    case 'align-left':

                        return (<p className='editor-alignleft'>{children}</p>)


                    case 'blockquote':
                        return (<blockquote className="editor-blockquote" >{children}</blockquote>)

                    case 'italic':
                        return <em >{children}</em>


                }
            }
        },
    },





    {
        deserialize(el, next) {
            // console.log('i wanmt to deserailize okay', 'el:',el  ,'next:', next() )

            const type = INLINE_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'inline',
                    type: type,
                    data: {
                        className: el.getAttribute('class'),
                        src: el.getAttribute('src')

                    },
                    nodes: next(el.childNodes),
                }
            }
        },

        serialize(obj, children) {

            if (obj.object == 'inline') {
                switch (obj.type) {
                    case 'code':
                        return (<code className="editor-code">{children}</code>)
                    case 'linkify':
                        return (<a className='editor-link' href={obj.data.get('src')}>{children}</a>)

                }
            }
        },
    },
















    // Add a new rule that handles marks...
    {
        deserialize(el, next) {
            //console.log('i wanmt to deserailize okay', 'el:',el  ,'next:', next() )
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (type) {
                return {
                    object: 'mark',
                    type: type,
                    nodes: next(el.childNodes),
                    data: {
                        className: el.getAttribute('class'),
                    }
                }
            }
        },



        serialize(obj, children) {
            if (obj.object == 'mark') {
                switch (obj.type) {
                    case 'bold':
                        return <b>{children}</b>

                    case 'italic':
                        return <em>{children}</em>

                    case 'underline':
                        return <u>{children}</u>

                    case 'strikethrough':
                        return <del>{children}</del>
/*
                    case 'align-right':
                        return (<div className={obj.data.get('className')}>{children}</div>)
                    case 'align-left':
                        return (<p className='editor-alignLeft'>{children}</p>)

*/
                    case 'linkify':
                        return (<a >{children}</a>)

                    case 'h':
                        return (<h2 >{children}</h2>)

                    case 'code':
                        return (<code className="editor-code">{children}</code>)


                }
            }
        },
    },
]

/*
const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: ''
                            }
                        ]
                    }
                ]
            },

        ]
    }

})

*/

const schema = {
    document: {
        normalize: (change, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        }
        ,

        last: { type: 'paragraph' },

    },

    blocks: {
        image: {
            isVoid: true,

        },
        embedvideo: {
            isVoid: true,
        }
    },
    nodes: {
        kind: 'block',
        type: 'ol',
        nodes: [{
            kind: 'block',
            type: 'li'
        }]

    }
}


/**
 * 
 * SCHEMA, SERIAL, DESERIAL, RULES END HERE...
 * 
 */

/**
 * 
 * EDITOR IMAGE
 * 
 */

const RenderImage = function (props) {
    var src = props.node.data.get('src');
    var caption = props.node.data.get('caption');
    var className = props.node.data.get('className');
    var { node, attributes } = props;
    console.log(className)
    return (<div>
        <img src={src} {...attributes} className={className} />
        <p><span style={{ textAlign: 'center', paddingLeft: '40%' }} > <i>{caption} </i></span></p>
    </div>
    )
}
/**
 * 
 * @function RenderEmbed
 * 
 * 
 */
const RenderEmbed = function (props) {
    var src = props.node.data.get('src');
    //var caption = props.node.data.get('caption');
    var className = props.node.data.get('className');
    var { attributes, node } = props;
    // console.log(props.attributes);
    return (
        <div {...attributes}>
            <iframe src={src} className={className} />

        </div>


    )
}


const html = new Html({ rules });



/**
 * @class EditorPanel
 * 
 * 
 */


export default class EditorPanel extends Component {

    constructor(props) {

        super(props)

        this.state = {
            value: Value.fromJS(initialValue)
            ,
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
            activeBlock:""



            //closeMedia: !openMedia, 

        }
        //const editor = new Editor({plugins, value, onChange})

        this.link_insert_display = this.link_insert_display.bind(this);

    }

   //editor = new Editor({plugins:null})
    
   UNSAFE_componentWillReceiveProps(nextProps) {
        var rawValue = html.deserialize(nextProps.initialValue);

        if (Object.keys(nextProps).length == 0) {
            
        }
        else {
            console.log('RAW VALUE IS NEW', rawValue)
            this.setState({ value: rawValue });

        }
    }


    renderInline=(prop)=>{
        let button =prop.data;

        const isActive = this.hasMark(button.name);
        return (
        <Button size='small' key={button.name} name={button.name} icon={button.action} onClick={this.Inline.bind(this, [button.action])}
        className='editor-editorButtons' active={isActive} ><Icon name ={button.name}/> </Button>   
             )
    }

    renderInline2 =(prop)=>{
        let button =prop.data;

        const isActive = this.hasMark(button.name);
        return (
            <Button size='small' key={button.name} name={button.name} onClick={this.Inline.bind(this, [button.action])}
            className='editor-editorButtons' active={isActive} ><Icon name={button.name} /></Button>     
         )
    }

    renderarrIconsBlock  =(prop)=>{
        let button =prop.data;

       var isActive = this.hasBlock(button.name);
        if (['unordered-list', 'ordered-list'].includes(button.key)) {
            const { value: { document, blocks } } = this.state
      
            if (blocks.size > 0) {
              const parent = document.getParent(blocks.first().key)
             isActive = this.hasBlock("ol") && parent && parent.type === type
            }
          }

        return (
            <Button size='small' key={button.name} name={button.name} onClick={this.Block.bind(this, [button.action])}
            className='editor-editorButtons' active={isActive} ><Icon name={button.name} /></Button>     
           
            )
    }




    componentDidMount() {

        if (Object.keys(this.props).length == 0) {
          //DO NOTHING
        }
        else {
        
            this.setState({ value: html.deserialize(this.props.initialValue) });

        }
    }



    /**
     * 
     * @function exposeEditorValue
     * Expose editor info to window global
     * 
     */



    get exposedEditorValue() {

        return window.editor;
    }

    /**
     * 
     * MONITOR ONCHANGE OF EDITOR
     * 
     */

    onChange = (change) => {
      
        this.setState({ value: change.value })
        window.editor = html.serialize(change.value);

        console.log(window.editor);
    }






    /**
     * CHECK IF ELEM HAS MARK
     * Is that block a Mark?
     * 
     */
    hasBlock = type => {
        const { value } = this.state
        return value.blocks.some(node => node.type === type)
      }

    hasMark(type) {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type == type)
    }


    /**
     * 
     * INLINE ELEM CONTROLLER
     * Render Inline Elements
     *
     */



    ref = editor => {
        this.editor = editor
    }


    Inline(mark) {
     

        var val;
        if (mark[0] === 'align-left') {

            const status = this.editor
                .removeMark('align-right')
            val = status;

        }
        else {
            const status = this.editor
                .toggleMark(mark[0]).focus()
            val = status
        }
        this.onChange(val);

    }

    /**
     * 
     * BLOCK ELEM CONTROLLER
     * Render Block Elements
     *
     */


    Block(node) {

        console.log("this is editor"+this.editor)
      

        var val;
        switch (node[0]) {
            case 'ol':
                var status = this.editor
                    //.setBlocks('ol')
                    .insertBlock('ol')
                    .setBlocks('li')
                    .insertText('First Item')
                    .unwrapBlock('ol')
                    .focus()

                val = status;
                break;


            case 'align-left':
                var status = this.editor
                    .setBlocks('align-left')
                    .focus()
                val = status;
                break;

            case 'align-right':
                var status = this.editor
                    .setBlocks('align-right')
                    .focus()
                val = status;
                break;

            case 'blockquote':
                var status = this.editor

                    .setBlocks('italic')
                    .wrapBlock(node[0])
                val = status;

                break;
            case 'ul':
                var status = this.editor
                    //.setBlocks('ol')
                    .setBlocks('li')
                    .focus()

                val = status;
                break;



            default:
                var status = this.editor

                    .insertBlock({
                        type: node[0],
                        isVoid: false
                    })
                    .unwrapBlock(node[0])
                val = status;
        }

        this.onChange(val);
    }


    /**
    * 
    * MARKS
    * Render Mark Elements
    *
    */

    renderMark = (props, editor, next) => {
        var { mark, attributes, children } = props;
        switch (mark.type) {
            case 'bold':
                return <strong>{children}</strong>

            case 'italic':
                return <em {...attributes}>{children}</em>

            case 'strikethrough':
                return <del>{children}</del>

            case 'underline':
                return <u>{children}</u>

            case 'code':
                return (<code className="editor-code">{children}</code>)

            case 'text':
                return (<p>{children}</p>)

            case 'linkify':
                return (<a {...attributes} >{children}</a>)

            case 'h':
                return (<h2 {...attributes} >{children}</h2>)
            /*case 'align-right':
                return (<p className='editor-alignright'>{props.children}</p>)
            case 'align-left':
                return (<p className='editor-alignLeft'>{props.children}</p>)
*/

            default:
                return next()


        }
    }

    /**
     * 
     *  RENDER NODE BLOCK
     * 
     */

    renderAnode(props, editor,next) {

        var src = props.node.data.get('src');
        var style = props.node.data.get('style');
        var { node, attributes } = props;

        switch (node.type) {
            case 'image':
            console.log("images heree"+props)
                return (< RenderImage {...props} />)


            case 'code':
                return (<code className='editor-code'>{props.children}</code>)

            case 'blockquote':
                return (<div className='editor-blockquote'>{props.children}</div>)

            case 'embedvideo':
                return (<RenderEmbed {...props} />)

            case 'align-left':
                //console.log(props)
                return (<p className="editor-alignLeft">{props.children}</p>)

            case 'align-right':
                // console.log(props)
                return (<p className="editor-alignright">{props.children}</p>)

            case 'ol':
                return (<ol {...attributes} >{props.children}</ol>)

            case 'ul':
                return (<ul {...attributes} >{props.children}</ul>)


            case 'li':
                return (<li {...attributes}  >{props.children}</li>)

            default:
                return next();

        }




    }


    /**
     * 
     *  SHOW MEDIA PROMPT
     * 
     */

    showMedia = (media_type) => {

        this.setState({ openMedia: true, mediaInfo: media_type })

    }



    /**
     * 
     *  HOT KEY SHORTCUTS
     * 
     */


    MarkHotkey(options) {
        const { type, key } = options

        // Return our "plugin" object, containing the `onKeyDown` handler.
        return {
            onKeyDown(event, change) {
                // Check that the key pressed matches our `key` option.
                if (!event.ctrlKey || event.key != key) return

                // Prevent the default characters from being inserted.
                event.preventDefault()

                // Toggle the mark `type`.
                change.toggleMark(type)
                return true
            },
        }
    }
    plugins = [
        this.MarkHotkey({ key: 'b', type: 'bold' }),
        this.MarkHotkey({ key: '`', type: 'code' }),
        this.MarkHotkey({ key: 'i', type: 'italic' }),
        this.MarkHotkey({ key: '~', type: 'strikethrough' }),
        this.MarkHotkey({ key: 'u', type: 'underline' }),
        //EditList()
    ]

    /**
     * 
     *  READ IMAGE URL
     * 
     */


    readFile(doc) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();

            reader.readAsDataURL(doc);

            reader.onloadend = function () {
                resolve(reader.result);
            }
        })

    }
    /**
     * 
     *  HANDLE IMAGE VALIDS
     * 
     */

    handle_image(ev) {
        ev.preventDefault();
        //test if its jpg or png or gif
        var img_regexp = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
        console.log(ev.target.className, ev.target.src);
        if (ev.target.type == 'file') {
            var { name } = ev.target.files[0];
           
            console.log(ev.target);
            if (img_regexp.test(name)) {
                this.readFile(ev.target.files[0]).then((result) => {
                    //LOL
                    this.state.image_url = result;
                    this.setState({ img_submit_inactive: false, invalid_file: false });


                })

            }
            else {
                /*alert('invalid image format');*/
                this.setState({ img_submit_inactive: true, invalid_file: true });
            }

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

        else if (ev.target.className == 'image-thumbnail' || ev.target.className == 'image-thumbnail-active') {

            if (ev.target.className == 'image-thumbnail') {
                if (img_regexp.test(ev.target.src)) {
                    console.log(ev.target.key, ev.target, 'active-thumbnail')

                    //NORMALIZE
                    let other_images = document.getElementsByClassName('image-thumbnail-active');
                    for (var i of other_images) {
                        i.className = 'image-thumbnail';

                    }

                    console.log(other_images, 'other images')

                    ev.target.className = 'image-thumbnail-active';
                    this.state.image_url = ev.target.src;

                    this.setState({ img_submit_inactive: false });

                }
            }
            //this guy must be an active thumbnail
            else if (ev.target.className == 'image-thumbnail-active') {
                if (img_regexp.test(ev.target.src)) {


                    //NORMALIZE
                    let other_images = document.getElementsByClassName('image-thumbnail');

                    for (var i of other_images) {
                        i.className = 'image-thumbnail';
                    }

                    ev.target.className = 'image-thumbnail';
                    this.state.image_url = ev.target.src;

                    //DONT WASTE MY TIME
                    this.setState({ img_submit_inactive: true });
                }
                //BAD IMAGE
            }



            else alert('inavli url')


        }

        //else
        else {
            /*alert('invalid url');*/
            this.setState({ img_submit_inactive: true, invalid_file: true });
            return null;
        }

    }


    /**
     * 
     *  GET THE IMAGE ONBOARD
     * 
     */

    sign_image() {

        let caption = document.getElementById('caption').value;
        var status = this.editor
        
            .insertBlock({
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

    /*
     *  TOGGGLE MODAL INSTANCES
     */
    toggleModalOptions() {
        if (this.state.modal1display == 'block') this.setState({ modal1display: 'none', modal2display: 'block', modalToggle: 'linkify' })

        else if (this.state.modal1display == 'none') this.setState({ modal1display: 'block', modal2display: 'none', modalToggle: 'grid layout' })

    }


    /**
     * 
     *  TOGGGLE EMBED INPUT
     * 
     */

    link_insert_display(ev) {

        if (this.state.link_insert_display === 'none') this.setState({ link_insert_display: 'block' });
        else this.setState({ link_insert_display: 'none' })

    }


    /**
     * 
     *  GET THE INPUT VALUE (EMBED) READY
     * 
     */
    embedVideoItem(ev) {
        this.setState({ embedurl: ev.target.value });
    }



    /**
     * 
     *  GET THE INPUT VALUE (EMBED) ON BOARD
     * 
     */
    embedVideoItemClick(ev) {
        // console.log(ev.key);

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


    /**
     * 
     *  THE MAIN RENDERER FUNCTION
     *   Dont delete 
     * 
     */

    render() {

        //ANYTHING INLINE

        var arrIconsInline = [
            { name: 'bold', action: 'bold', key: 'bold' },
            { name: 'italic', action: 'italic', key: 'italic' },
            { name: 'underline', action: 'underline', key: 'underline' },

            { name: 'strikethrough', action: 'strikethrough', key: 'strikethrough' },
            { name: 'terminal', action: 'code', key: 'code' },
            { name: 'linkify', action: 'linkify', key: 'linkify' },

        ]
        //MEDIA ITEMS

        var arrIconsMedia = [
            { name: 'image', action: 'image', key: 'image' },



        ]
        //QUOTES AND LISTS

        var arrIconsBlock = [

            { name: 'quote right', action: 'blockquote', key: 'quote-right' },
            { name: 'ordered list', action: 'ol', key: 'ordered-list' },
            { name: 'unordered list', action: 'ul', key: 'unordered-list' },

            { name: 'align left', action: 'align-left', key: 'align-left' },

            { name: 'align right', action: 'align-right', key: 'align-right' },

        ]
        //H1 && H2
        var arrIconsInline2 = [

            { name: 'heading', action: 'h', key: 'h' },


        ]



        return (



            <div style={{ padding: '0px', height: '100%' }}>




                <div>
                    {this.state.mediaInfo == 'image' ? (<Modal dimmer={true} size='mini' open={this.state.openMedia} >


                        <Modal.Header><Icon size='small' style={{ cursor: 'pointer', color: 'rgb(3, 68, 94)' }} title='Use hashstack gallery or insert image URL' name={this.state.modalToggle} onClick={this.toggleModalOptions.bind(this)} /> Insert new {this.state.mediaInfo} {this.state.deleteArticleName}</Modal.Header>

                        <Modal.Content style={{ background: "url('src/img/tech.png') no-repeat right top", padding: '0px' }}  >
                            <div className='modalContent' style={{ display: this.state.modal1display }} >
                                <p> Insert new {this.state.mediaInfo} URL ( also from your hashstack gallery) or Upload from storage </p>
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
                            <div className="modalContent2" style={{ display: this.state.modal2display }}>


                                <Grid>
                                    <Grid.Row className='row'>

                                        <img src={sample_image} className='image-thumbnail' onClick={this.handle_image.bind(this)} id={1} />
                                        <img src='src/img/tech.png' className='image-thumbnail' onClick={this.handle_image.bind(this)} id={2} />
                                        <img src='src/img/tech.png' className='image-thumbnail' onClick={this.handle_image.bind(this)} id={3} />
                                        <img src='src/img/saa.png' className='image-thumbnail' onClick={this.handle_image.bind(this)} id={4} />
                                        <img src='src/img/saa.png' className='image-thumbnail' onClick={this.handle_image.bind(this)} id={5} />


                                    </Grid.Row>

                                </Grid>


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
                            <Modal.Content  >
                                <Input type='text' id='link_insert' placeholder='insert url &amp; click enter' style={{ width: '100%', background: 'white' }}>
                                    <input value={this.state.embedurl} onChange={this.embedVideoItem.bind(this)} onKeyDown={this.embedVideoItemClick.bind(this)} />
                                    <Icon name='paper plane outline' />

                                </Input>


                            </Modal.Content>


                        </Modal>
                        )
                    }

                </div>













                <div className='editor-buttons' id='editor-buttons' >



                    {arrIconsInline.map( button => {
                        return (<this.renderInline data={button} key={button.name}/>)
                    })}

                    {arrIconsInline2.map((button) => {
                        return (<this.renderInline2 data={button} key={button.name}/>)

                    })}

                    <Icon size='small' className='editor-editorButtons' name='image' onClick={this.showMedia.bind(this, ['image'])} />

                    <Icon size='small' className='editor-editorButtons' name='code' onClick={this.showMedia.bind(this, ['code'])} />




                    {arrIconsBlock.map( button => {
                        return (<this.renderarrIconsBlock data={button}/>)

                    })}


                </div>





                    <div className='editor'>
                        <Editor
                            autoCorrect
                            value={this.state.value}
                            onChange={this.onChange}
                            plugins={this.plugins}
                            placeholder="let'\s write something good"
                            renderMark={this.renderMark}
                            renderBlock={this.renderAnode}
                            
                            schema={schema}
                            className='editor-mainpart'
                            onKeyDown={this.onKeyDown}
                            autoFocus
                            ref={this.ref}
                            
                            


                        />
                    </div>

            </div>


        )


    }


}

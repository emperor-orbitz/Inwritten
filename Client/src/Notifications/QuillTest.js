import React from 'react';
import '../../Resources/styles/comment.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ReactQuill, { Quill } from 'react-quill'; // ES6


import  "quill/dist/quill.core.scss";
import  "quill/dist/quill.core.js";

import "quill/dist/quill.min.js";
import "quill/dist/quill.js";

import "quill/dist/quill.bubble.scss";
//import "quill/dist/quill.snow.scss";


/**
 * Inline Em Tag from Quill Docs:
 * https://quilljs.com/guides/cloning-medium-with-parchment/
 */

 
let Inline = ReactQuill.Quill.import('blots/inline');



class BoldBlot extends Inline {}
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';
Quill.register('formats/bold', BoldBlot);



class EmphBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.setAttribute('style', 'font-size:150%; color: purple');
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}


EmphBlot.blotName = 'em';
EmphBlot.tagName = 'em';
EmphBlot.className = 'custom-em';
ReactQuill.Quill.register('formats/em', EmphBlot);



/**
 * Example HR tag from:
 * https://stackoverflow.com/questions/37525867/
 */

var Embed = ReactQuill.Quill.import('blots/block/embed');
class Divider extends Embed {
    static create(value) {
        let node = super.create(value);
        return node;
    }
}
Divider.blotName = 'divider';
Divider.tagName = 'hr';

ReactQuill.Quill.register({
  'formats/hr': Divider
});


class QuillTest extends React.Component {

    constructor(props) {
        super(props);

        //this.formats =formats;
        this.state = { text: " " } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
        this.quillRef = null;
        this.reactQuillRef = null;

        this.handleClickEmbed = this.handleClickEmbed.bind(this)
        this.handleClickFormat = this.handleClickFormat.bind(this)
        this.registerFormats = this.registerFormats.bind(this)
        this.handleBoldFormat = this.handleBoldFormat.bind(this)
        this.handleCodeFormat = this.handleCodeFormat.bind(this)
        this.handleDividerFormat = this.handleDividerFormat.bind(this)
    }




      componentDidMount(){
        this.registerFormats()
        this.setState({
          text: '' // trigger update
        })
      }


      componentDidUpdate () {
        this.registerFormats()
      }

      
  registerFormats () {
    // Ensure React-Quill references is available:
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;
    
    console.log('Registering formats...', this.reactQuillRef)
    const quillRef = this.reactQuillRef.getEditor() // could still be null
    
    if (quillRef != null) {
      this.quillRef = quillRef;
      console.log(Quill.imports)
    }
  }
  











  handleBoldFormat () {
    var quill = this.quillRef;
    var range = quill.getSelection();
    if(quill.getFormat(range).bold == true){
        quill.format('bold', false)
    }
    else   
        quill.format('bold', true);

  }
  
  handleClickFormat () {
    var range = this.quillRef.getSelection();
    if (range) {      
      this.quillRef.format('em', true);
    }
  }


handleDividerFormat (){



    var quill = this.quillRef;
    var range = quill.getSelection(true);

    quill.insertText(range.index, "\n")
    quill.insertEmbed(range.index +1, "divider", true)
    quill.getSelection(range.index+2)

}


  handleCodeFormat () {

    var quill = this.quillRef;
    var range = quill.getSelection();

    if(quill.getFormat(range)['code-block'] == true){
        quill.format('code-block', false)
    }
    else   
        quill.format('code-block', true);

  }

  

  handleClickEmbed () {
    var range = this.quillRef.getSelection();
    if (range) {      
      this.quillRef.insertEmbed(range.index,"hr","null")
    }
  }
  

  handleChange (html) {
      console.log(html)
  	this.setState({ text: html });
  }
  


    modules = {
        toolbar: [
          
          ['bold', 'italic', 'blockquote'],
          ['link', 'image'],
          [{ 'header':"1"}, {"header":"2" }],

         
        ],
      }
     

      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image', "formats/em", "formats/hr","hr", "em",
        "code-block", 'code',"divider"
      ]


    render() {

    return (
        <div>

        <button onClick={this.handleClickEmbed}>Insert Hr Format</button>
        <button onClick={this.handleBoldFormat}>Insert Bold Format</button>
        <button onClick={this.handleCodeFormat}>Insert Code Format</button>
        <button onClick={this.handleDividerFormat}>Insert Divider </button>

                <ReactQuill value={this.state.text}
                  onChange={this.handleChange}
                  ref={(el) => { this.reactQuillRef = el }}
          theme="bubble"
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          placeholder="Start writing something great..."
          
                  >
                </ReactQuill>
</div>
    )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(QuillTest));







import React from 'react'
import {  Block } from 'slate'
import { isKeyHotkey } from 'is-hotkey';

const BLOCK_TAGS= {
    blockquote: 'block-quote',
    p: 'paragraph',
    img: 'image',
    iframe: 'embedvideo',
    ol: 'ol',
    li: 'li',
    p: 'align-right',
    h1:"heading-one",
    h2:"heading-two",
    caption:"caption",
    p: 'align-left',
    ul:"bulleted-list"
    //embed:'embed'
  }

  const MARK_TAGS = {
    em: 'italic',
    strong: 'bold',
    u: 'underline',
    del: 'strikethrough',
    u: 'underline',
    code: 'code',
    del:"strikethrough"
  
  }
  
 const INLINE_TAGS = {
    code: 'code',
    a: 'linkify',
    
 }

module.exports = {

    DEFAULT_NODE: 'paragraph',




  //SLATE BLOCK, MARK & INLINE RULES

  rules: [
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
                    
  
                    case 'paragraph':
                        return <p className={obj.data.get('className')}>{children}</p>
  
                    case 'image':
                        return (< img src={obj.data.get('src')} className={obj.data.get('className')} />)
  
                        
                    case 'embedvideo':
                        return ( <div>
                            <iframe src={obj.data.get('src')} className={obj.data.get('className')} />
                              </div>
                              )
                    case 'numbered-list':
                    return <ol>{children}</ol>
  
                    case 'bulleted-list':
                    return <ul style={{listStyleType:"square"}} >{children}</ul> 
            
  
                    case 'heading-one':
                            return <h1>{children}</h1>
  
                    case 'heading-two':
                            return <h2>{children}</h2>
  
                    case 'list-item':
                        return (<li >{children}</li>)
  
                    case 'ol':
                        return (<ol type='i'>{children}</ol>)
  
                    case 'align-right':
  
                        return (<p className='editor-alignright'>{children}</p>)
  
                    case 'align-left':
  
                        return (<p className='editor-alignleft'>{children}</p>)
  
  
                    case 'block-quote':
                        return <blockquote className="editor-blockquote">{children}</blockquote>
  
                        
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
                    case 'span':
                        return (<span style={{ textAlign:"center" }}>{children}</span>)
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
                        return <strong>{children}</strong>
  
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
                        return (<a>{children}</a>)
  
  
                    case 'code':
                        return (<code className="editor-code">{children}</code>)
  
  
                }
            }
        },
    },
  ],

  //SLATE NORMALIZE AND VALIDATION SCHEMA

  schema : {
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
  },
  
  //SLATE MARK RENDERER SWITCH
renderMark: (props, editor, next) => {

    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...{attributes}}>{children}</strong>
        case 'linkify':
        return <a {...{attributes}}>{children}</a>
      case 'code':
        return <code className="editor-code" {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underline':
        return <u {...attributes}>{children}</u>
      case 'strikethrough':
        return <del {...attributes}>{children}</del>
      default:
        return next()
    }
  },
  

    //SLATE BLOCK RENDERER SWITCH

  renderBlock: (props, editor, next) => {
    const { attributes, children, node, isFocused } = props
    let src= null || node.data.get('src')
    let caption= null || node.data.get('caption')

    switch (node.type) {

      case 'image':
    return (
        <div>
        <img src={src} {...attributes} className='editor-image'style={{
        outline: isFocused ? "4px solid black":"none"}} />
       <p><span style={{ textAlign:"center"}}>{caption}</span></p>
    </div>
    )
      case 'paragraph':
        return <p {...attributes}>{children}</p>

      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>

      case 'bulleted-list':
        return <ul style={{listStyleType:"square"}} {...attributes}>{children}</ul> 

      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>

        
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2> 
        
        
      case 'list-item':
        return <li {...attributes}>{children}</li>

      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>

      
        case 'align-right':
        return (<p {...attributes} className="editor-alignright">{children}</p>)

    

      default:
        return next()
    }
  },

  onKeyDown: (event, editor, next) => {
    const isBoldHotkey = isKeyHotkey('mod+b')
    const isItalicHotkey = isKeyHotkey('mod+i')
    const isUnderlinedHotkey = isKeyHotkey('mod+u')
    const isCodeHotkey = isKeyHotkey('mod+`')
    
    
    let mark
  
    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underline'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }
  
    event.preventDefault()
    editor.toggleMark(mark)
  }
  



  }





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

})*/






  

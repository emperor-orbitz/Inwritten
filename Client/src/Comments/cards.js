import React from 'react'
import { List, ListIcon, Button, Image } from 'semantic-ui-react'

const ListExampleSelection = (props) =>{ 
    var { index, x } =props;
    return(
        <List.Item key={x._id}>
            <List.Content floated="right">
            <Button.Group size='mini' >
               <Button icon='like' onClick ={()=>{props.like_comment(x._id)}} content={x.likes} />
               <Button icon='trash alternate outline' onClick ={()=>{props.delete_comment(x._id)}} />
               <Button>{x.seen == true? 'Hide':"Accept"}</Button>

          </Button.Group>
            </List.Content>
            <Image avatar src={x.commenter_id.display_picture} />
            <List.Content><h3>{x.comment}</h3>
            <span>{x.commenter_id.username}</span>
            <br/>
            {x.createdAt}
            </List.Content>
             
        </List.Item>

)

}



export default ListExampleSelection

/*

   <List.Header as='h4'> <a href={x.post_link} target="__blank">{x.title}</a> </List.Header>
                <List.Description as="i">{x.description==""? "---":x.description}</List.Description>
                <List.Description >By {x.author}</List.Description>

            </List.Content>




<div className="comment-panel">
<Image spaced="right" className='comment-thumbnail' src={each.commenter_id.display_picture} size='mini' />
   <div style={{float:"left", position:"relative", display: "table-row"}}>

   <span>{each.comment}</span>
   <br></br>
   <p> <i style={{fontSize:"11px"}}>{each.commenter_id.username}({each.commenter_id.email})</i>
   </p>
    
   <Button.Group size='mini' >
               <Button icon='like' onClick ={()=>{this.like_comment(each._id)}} content={each.likes} />
               <Button icon='trash alternate outline' onClick ={()=>{this.delete_comment(each._id)}} />
               <Button>{each.seen == true? 'Hide':"Accept"}</Button>
               <Button><Icon name="clock outline" size='small' color="blue" /> {date_to_string(each.createdAt)}</Button>

   </Button.Group>
   &nbsp;&nbsp;&nbsp; 

   </div>

</div>

*/
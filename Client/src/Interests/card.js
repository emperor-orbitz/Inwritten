import React from 'react'
import { Item, Grid, Link } from 'semantic-ui-react'

const ListExampleSelection = (props) =>{ 
    var { index, x } =props;
    return(

        <Grid.Column computer={5} mobile={16} tablet={4} style={{marginTop:"10px"}} >
        <Item style={{marginBottom:'12px'}} key={x._id}>
              <Item.Image floated="right" size="small" src={x.featured_image} />
        
              <Item.Content verticalAlign="middle" >
                <Item.Header as={Link} to={x.post_link } ><a target="_blank" href={x.post_link}><h4 style={{color:"black"}}>{x.title}</h4></a></Item.Header>
                <Item.Description>{x.description}</Item.Description>     
                   <Item.Meta>By {x.author} </Item.Meta>
                    <Item.Extra>
                    <a style={{color:"black"}} href={x.post_link}><span>Read Story</span></a>
                    
                    </Item.Extra>
                    
              </Item.Content>
            </Item>
 </Grid.Column>



)

}



export default ListExampleSelection
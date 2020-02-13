import React from 'react'
import { List, ListIcon } from 'semantic-ui-react'

const ListExampleSelection = (props) =>{ 
    var { index, x } =props;
    return(
        <List.Item key={x._id}>
            <ListIcon children={<h2>#{++index}</h2>} />
            <List.Content>
                <List.Header as='h4' style={{ color:"black !important"}}> <a href={x.post_link} target="__blank">{x.title}</a> </List.Header>
                <List.Description>{x.description==""? "---":x.description}</List.Description>
                <List.Description >By {x.author}</List.Description>
            </List.Content>
        </List.Item>

)

}



export default ListExampleSelection
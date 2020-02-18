import React from 'react'
import { List, ListIcon } from 'semantic-ui-react'

const ListExampleSelection = (props) =>{ 
    var { index, x } =props;
    if(props.x == null){
        return <div>You have non unread notification</div>
    }
    else
    return(
        <List.Item key={x._id}>
            <ListIcon children={<h2>#{++index}</h2>} />
            <List.Content>
                <List.Description > {x.sender} is {x.type} you on {x.createdAt}    </List.Description>
            </List.Content>
        </List.Item>

)

}



export default ListExampleSelection
import React from 'react'
import { Table, Button } from 'semantic-ui-react'

const ListExampleSelection = (props) =>{ 
    var { index, x } =props;
    if(props.x == null){
        return <div>You have no unread notification</div>
    }
    else
        switch(x.type){
            case "COMMENT":
            return(
                <Table.Row>
                    <Table.Cell>@{x.sender.username}</Table.Cell>
                    <Table.Cell><b>They responded to your story <a href="#">xxx</a> </b> | {x.createdAt}</Table.Cell>
                    <Table.Cell>
                     <Button icon='times' onClick ={()=>{props.delete_notification(x._id)}} />
                    </Table.Cell>
        
                </Table.Row>
        
        );
        case "LIKE":
        return(
            <Table.Row>
            <Table.Cell>@{x.sender}</Table.Cell>
            <Table.Cell><b>They liked your story <a href="#">xxx</a> </b> | {x.createdAt}</Table.Cell>
            <Table.Cell>
            <Button icon='times' onClick ={()=>{props.delete_notification(x._id)}} />

            </Table.Cell>

        </Table.Row>
    
    )
    case "FOLLOW":
    return(
        <Table.Row>
        <Table.Cell>@{x.sender}</Table.Cell>
        <Table.Cell><b>Cool, You have a new follower. <a href="#">xxx</a> </b> | {x.createdAt}</Table.Cell>
        <Table.Cell>
        <Button icon='times' onClick ={()=>{props.delete_notification(x._id)}} />

        </Table.Cell>

    </Table.Row>

)
        
        }

   
}



export default ListExampleSelection
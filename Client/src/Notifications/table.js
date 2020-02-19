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
                    <Table.Cell>@{x.sender}</Table.Cell>
                    <Table.Cell><b>They {x.type} responded to your story xxx </b> | {x.createdAt}</Table.Cell>
                    <Table.Cell>
                     <Button icon='check' onClick ={()=>{props.read_notification(x._id)}} />
                      <Button icon='trash alternate outline' onClick ={()=>{props.delete_notification(x._id)}} />
                    </Table.Cell>
        
                </Table.Row>
        
        )
        
        }

   
}



export default ListExampleSelection
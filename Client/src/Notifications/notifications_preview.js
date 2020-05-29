
import React from 'react';
import Link from 'react-router-dom/Link';
import '../../Resources/styles/article.scss';
import {Table, Grid, Button, Icon } from 'semantic-ui-react'

//   DATE CONVSERSION

function date_to_string(date) {
    var fulldate = new Date(date);
    var month = getmonthName(fulldate.getMonth());
    var year = fulldate.getFullYear();
    var day = fulldate.getDate();
    var convert = `${day}- ${month}`;
    return convert;
}

//   MONTH DEDUCER FUNCTION


function getmonthName(number) {
    var months = [
        '01', '02', '03', '04', '05', '06',
        '07',
        '08',
        '09', '10', '11', '12'
    ]
    return months[number];

}




/*
*
*           Notification PREVIEW FUNCTION
*
*/

export default function NotificationsPreview(props) {
    
    var { data } = props;
   
    if (data.data == null) {

        return (
            <div className='bodyArticle'>
         <h5>Recent Activities | <Link to="/app/notification">Notifications</Link></h5>

               <p>Great!, You have no notifications </p> 

            </div>

        )
    }




    else {

      


        return (
            //<Grid.Row className="row">
            <div style={{width:"100%"}}>

            <Grid.Row className='row' >
                <h5>Recent Activities | <Link to="/notification">Notifications</Link></h5>
                    <Table>
                {data.map(function (e) {

                        return (
                            <Table.Row>
                              <Table.Cell>{e.sender.username}</Table.Cell>
                              <Table.Cell><b>They responded to your story <a href="#">xxx</a> </b> | {e.createdAt}</Table.Cell>
                              <Table.Cell>
                               <Button icon='times' />
                              </Table.Cell>
                              </Table.Row>
                             
                        )

                })

                }
             </Table>

            </Grid.Row>
            </div>







        )
    }
}

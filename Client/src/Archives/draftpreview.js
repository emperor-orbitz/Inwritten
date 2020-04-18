
import React from 'react';
import Link from 'react-router-dom/Link';
import '../../Resources/styles/article.scss';
import { Card, Button } from 'semantic-ui-react';


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
*           ARTICLE PREVIEW FUNCTION
*
*/

export default function DraftPreview(props) {
    
    var {  Grid, Item, Dropdown} = props.imports;

    console.log(props.data,"component")
    if (props.data.length == 0) {

        return (
            <div className='bodyArticle'>
               <p>Oops, we have no stories yet! </p> 

            </div>

        )
    }




    else {

      


        return (
            //<Grid.Row className="row">

            <Grid.Row className='row' style={{topMargin:'10px'}} >
                <h3>Top Stories </h3>
<br/>
                {props.data.data.map(function (e) {

                        return (
                        
                            <Grid.Column style={{margin:"10px auto"}} computer={5} mobile={16} tablet={4} >
<Item style={{marginBottom:'12px'}} key={e._id} >
<Item.Image floated="right" size="small" src={e.featured_image} />

<Item.Content verticalAlign="middle" >
<Item.Header><h4 ><a style={{color:"black"}} href={e.post_link}>{e.title}</a></h4></Item.Header>
<Item.Description>@{e.author.toUpperCase()}</Item.Description>     
<Item.Meta>{e.time_to_read} mins read</Item.Meta>




</Item.Content>
</Item>
             </Grid.Column>


                        )

                    


                })

                }


                             <Grid.Column computer={5} mobile={16} tablet={4} >

                             <a href="/stories" target="_blank"><Button secondary>SEE MORE STORIES</Button></a>
             </Grid.Column>
            </Grid.Row>







        )
    }
}

/*

<Card style={{ width: '200px', paddingBottom: '10px' }} size='small' >
<Image src="src\img\background.jpg" />
<Card.Content>
    <Card.Header><h3>{post.title}</h3></Card.Header>
    <Card.Meta>
        <span style={{ color: 'rgb(3, 68, 94)' }} className='date'> By: {post.author}</span>
    </Card.Meta>
    <Card.Meta>
        <span style={{ color: 'rgb(3, 68, 94)' }} className='date'> Created: {date_to_string(post.createdAt)}</span>
    </Card.Meta>
    <Card.Description> {post.description}
    </Card.Description>
</Card.Content>
<Card.Content extra>

    <Button.Group basic size="mini" floated="right">
        <Button icon="expand" />

    </Button.Group>

</Card.Content>
</Card>
*/
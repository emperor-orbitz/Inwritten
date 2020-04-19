
import React from 'react';
import '../../Resources/styles/article.scss';
//import   Button  from 'semantic-ui-react';
let Button = require("semantic-ui-react").Button;

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

    var { Grid, Item, Loader } = props.imports;

    console.log(props.data, "component")
    if (props.data.length == 0) {

        return (
            <div className='bodyArticle'>
                <h3>Top Stories </h3>
                <Loader active={true} content='Fetching Stories...' size="small" />

            </div>

        )
    }




    else {




        return (
            //<Grid.Row className="row">

            <Grid.Row className='row' style={{ topMargin: '10px' }} >
                <h3>Top Stories </h3>
                <br />
                {props.data.data.map(function (e) {

                    return (

                        <Grid.Column style={{ margin: "10px auto" }} computer={5} mobile={16} tablet={4} >
                            <Item style={{ marginBottom: '12px' }} key={e._id} >
                                <Item.Image floated="right" size="small" src={e.featured_image} />

                                <Item.Content verticalAlign="middle" >
                                    <Item.Header><h4 ><a style={{ color: "black" }} href={e.post_link}>{e.title}</a></h4></Item.Header>
                                    <Item.Description>@{e.author.toUpperCase()}</Item.Description>
                                    <Item.Meta>{e.time_to_read} mins read</Item.Meta>




                                </Item.Content>
                            </Item>
                        </Grid.Column>


                    )

                })

                }


                <Grid.Column computer={5} mobile={16} tablet={4} >

                    <a href="/stories" target="_blank"><Button secondary size="tiny">SEE MORE STORIES</Button></a>
                </Grid.Column>
            </Grid.Row>







        )
    }
}

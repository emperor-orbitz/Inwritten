
import React from 'react';
import '../../Resources/styles/article.scss';
import  {Button, Placeholder}  from 'semantic-ui-react';
import ReactPlaceholder from 'react-placeholder';
import "./reactPlaceholder.scss";
 


function image_transform(url, width, height){
//Add height and width to image
 return url.replace("/upload/", `/upload/h_${height},w_${width}/`)
}

/*
*
*           ARTICLE PREVIEW FUNCTION
*
*/

export default function DraftPreview(props) {

    var { Grid, Item, } = props.imports;
    var test = [1,2,3,4,5,6];

    if (props.data.length == 0) {

        return(
        <Grid.Row className='row' style={{ topMargin: '10px' }} >

    {test.map(e=>{
    return(
        <Grid.Column key={e} style={{ margin: "10px auto" }} computer={5} mobile={16} tablet={4}  >
    <ReactPlaceholder type='media' rows={2} ready={false}>
      <div>Loading...</div>
    </ReactPlaceholder>
        </Grid.Column>
    )
})
    }
</Grid.Row>
        )
      
    }




    else {




        return (
            //<Grid.Row className="row">
            <Grid.Row className='row' style={{ topMargin: '10px' }} >
                <br />
                {props.data.data.map(function (e) {

                    return (

                        <Grid.Column style={{ margin: "10px auto" }} computer={5} mobile={16} tablet={4}  >
                            <Item style={{ marginBottom: '12px' }} key={e._id} >
                                <Item.Image floated="right" size="small" src={image_transform( e.featured_image, 200, 91 )} className="item-image"/>

                                <Item.Content >
                                    <Item.Header><h4 ><a style={{ color: "black" }} href={e.post_link}>{e.title}</a></h4></Item.Header>
                                    <Item.Description>@{e.author.toLowerCase()}</Item.Description>
                                    <Item.Meta>{e.time_to_read} mins read</Item.Meta>
                                </Item.Content>
                            </Item>
                        </Grid.Column>


                    )

                })

                }


                <Grid.Column style={{ margin: "10px auto" }} computer={5} mobile={16} tablet={4} >

                    <a href="/stories" target="_blank"><Button size="tiny">Load More...</Button></a>
                </Grid.Column>
            </Grid.Row>






        )
    }
}

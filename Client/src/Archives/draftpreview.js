
import React from 'react';
import Link from 'react-router-dom/Link';
import '../../Resources/styles/article.scss';
import { Card } from 'semantic-ui-react';


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
    
    var { ArticleReducer, Grid, Button } = props.imports;
    var articles_preview = ArticleReducer.filter((v)=>{
        return v.public == false
    });

    if (articles_preview.length == 0) {

        return (
            <div className='bodyArticle'>
               <p>Great!, You have no unpublished draft </p> 

            </div>

        )
    }




    else {

      


        return (
            //<Grid.Row className="row">

            <Grid.Row className='row' >
                <h5>Unpublished Drafts |  <Link to="/drafts">Drafts</Link></h5>

                {articles_preview.map(function (e) {

                        return (
                            <Card key={e._id} fluid >
                            <Card.Content header={e.title} />
                            <Card.Content description={e.description} />
                            <Card.Content extra>
                            <Button.Group className="button-hover" size='small' icon >
                                                <Button icon='eye outline' as={Link} to={{ pathname: '/app/edit-post/' + e._id }} />
                                                <Button icon='comments' as={Link} to={`/comments/${e._id}`} />
                                                <Button icon='share outline'  />

                                            </Button.Group>
                            </Card.Content>
                            </Card>
                          



                        )

                    


                })

                }
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
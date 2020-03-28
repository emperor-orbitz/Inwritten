
import React from 'react';
import Link from 'react-router-dom/Link';
import '../../Resources/styles/article.scss';


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

export default function ArticlePreview(props) {



    var { ArticleReducer, Grid, Button } = props.imports;
    var { username } = props.credentials;
    var articles_preview = [];
    if (ArticleReducer.length == 0) {

        return (
            <div className='bodyArticle'>
                Oops, It seems you have no Article written
                You can start from
                <Link to="/add-post" >HERE</Link>
                <br /> OR Click the pencil

            </div>

        )
    }




    else {

        articles_preview = ArticleReducer.slice(0, 5);


        return (
            //<Grid.Row className="row">

            <Grid.Row className='row' >
                <h5>Your recent stories</h5>

                {articles_preview.map(function (e) {

                    if (e.featured_image == undefined || e.featured_image == "") {
                        return (

                            <div key={e._id} className='image-thumbnail-template-cover-big'>

                                <div style={{ margin: '7px 7px' }}>
                                    <div className={`customCard-${e.category} hover-group`} >
                                        <h4 style={{ marginTop: '0px', padding: '0px', textOverflow: 'ellipsis' }}>
                                            {e.title}
                                        </h4>
                                        <p>{date_to_string(e.createdAt)}</p>

                                    </div>
                                </div>

                                <div className='template-thumbnail-hover-big'>

                                    <div style={{}}>
                                        <div className="category">

                                            <Button.Group className="button-hover" size='small' icon >
                                                <Button icon='edit outline' as={Link} to={{ pathname: '/app/edit-post/' + e._id }} />
                                                <Button icon='external alternate' target="__blank" as={Link} to={`${e.post_link}`} />
                                                <Button icon='comments' as={Link} to={`/app/comments/${e._id}`} />

                                            </Button.Group>
                                        </div>

                                    </div>
                                </div>

                            </div>



                        )

                    }


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
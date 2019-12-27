
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

function HoverableDiv(props) {
    let Button = props.button;
    return (
        <div className='image-thumbnail-template-cover-big'>

            {props.children}

            <div className='template-thumbnail-hover-big'>
                <h2 style={{ marginTop: '0px', padding: '0px' }}>{props.type}</h2>

                <div size='large' style={{ marginTop: '100px', float: 'right' }}>
                    <Button.Group size='small' color='teal' secondary >
                        <Button icon='external alternate' target="__blank" as={Link} to={`http://localhost:5000/${this.props.ProfileReducer.username}/${e.title}`} />
                        <Button icon='info' />

                    </Button.Group>
                </div>
            </div>

        </div>
    )
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
                {articles_preview.map(function (e) {

                    if (e.featured_image == undefined || e.featured_image == "") {
                        return (
                            
                            <div key={e._id} className='image-thumbnail-template-cover-big'>

                                <div style={{ margin: '10px 3px' }}>

                                    <div className={'customCard-' + e.category} >

                                        <div className='customCard-inner' >
                                            <span style={{}} >Title </span>
                                            <h4 style={{ marginTop: '0px', padding: '0px', textOverflow: 'ellipsis', height: '30%' }}>
                                                {e.title}
                                            </h4>

                                            <span><b>Created On </b> </span>
                                            <p>{date_to_string(e.createdAt)}</p>

                                        </div>

                                    </div>
                                </div>


                                <div className='template-thumbnail-hover-big'>

                                    <div style={{}}>
                                        <div className="category">
                                            <span><b>About</b> </span>
                                            <p>{e.description} </p>

                                                <Button.Group className="button-hover" size='small' color='teal' secondary >
                                                    <Button icon='edit outline' as={Link} to={{ pathname: '/edit-post/' + e._id }} />
                                                    <Button icon='external alternate' target="__blank" as={Link} to={`${e.post_link}`} />
                                                    <Button icon='comments' as={Link} to={`/comments/${e._id}`} />

                                                </Button.Group>
                                        </div>

                                    </div>
                                </div>

                            </div>



                        )

                    }

                    else
                        console.log("Shown this", e.featured_image)
                    return (
                        <div key={e._id} className='image-thumbnail-template-cover-big'>

                            <div style={{ margin: '10px 3px' }}>

                                <div className={'customCard-' + e.category} style={{ backgroundImage: `url('${e.featured_image}')`, backgroundSize: "cover", backgroundPosition: "bottom right" }}>

                                    {/*<div className='customCard-inner'  >
                    <span style={{}}>Title </span>
                    <h4 style={{ marginTop: '0px', padding: '0px', textOverflow: 'ellipsis', height: '30%' }}>
                        {e.title}
                    </h4>

                    <span><b>Created On </b> </span>
                    <p>{date_to_string(e.createdAt)}</p>

</div>*/}

                                </div>
                            </div>


                            <div className='template-thumbnail-hover-big'>

                                <div style={{}}>
                                    <div className="category">
                                        <span><b>Title</b> </span>
                                        <h3>{e.title} </h3>

                                                <Button.Group className="button-hover" size='small' color='teal' secondary >
                                                    <Button icon='edit outline' as={Link} to={{ pathname: '/edit-post/' + e._id }} />
                                                    <Button icon='external alternate' target="__blank" as={Link} to={`${e.post_link}`} />
                                                    <Button icon='comments' as={Link} to={`/comments/${e._id}`} />

                                                </Button.Group>
                                    </div>

                                </div>
                            </div>

                        </div>



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
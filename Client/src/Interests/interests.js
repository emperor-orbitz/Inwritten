import React from 'react';
import '../../Resources/styles/comment.scss';
import { Button, Form, Input, Grid, Container, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';
import ProfileUpdate from '../../Controllers/profile.controller';

import ListExampleSelection from "./card"





class Interests extends React.Component {

    constructor(props) {
        super(props);
        this.data_store = [];
        this.state = {
            search: "",
            posts: [],
            loading: true,
            not_found: false,
            search_criteria: "title"
        }

    }

    categoryOptions = [
        {
            key: 1,
            value: 'title',
            text: 'By Title',

        },
        {
            key: 2,
            value: 'author',
            text: 'By Author'
        }

    ]


    parseMatch(param) {
        let search = param
        return /\?topic=(.+)/.test(search) == true ? search.match(/\?topic=(.+)/)[1] : "empty";
    }

    onChangeSearch = (e) => {
        var search = e.target.value;
        this.state.not_found == true ? this.setState({ not_found: false }) : "";
        console.log(this.props)
        this.setState({ search: search })
    }


    search_with_criteria = () => {

        var { posts, search_criteria, search } = this.state;
        let search_results = posts.filter((v, i) => v[search_criteria]
            .toLowerCase()
            .indexOf(search.toLowerCase()) != -1)

        if (search_results.length === 0 || search.length == 0) {
            this.setState({ posts: this.data_store, not_found: true })
        }
        else
            this.setState({ posts: search_results, not_found: false })


    }
    

    handleSearchCriteria = (e, p) => {

        this.setState({ not_found: false, search_criteria: p.value })
    }

    componentDidMount() {
        //find topic
        var topic = this.parseMatch(this.props.location.search);
        var article_controller = new FetchArticles();
        article_controller.interest(topic)
            .then(value => {
                this.setState({ posts: value, loading: false })
                this.data_store = value;
                console.log(value)
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
            })


    }


    componentWillUpdate(nextProp, nextState) {

        var topic = this.parseMatch(nextProp.location.search);
        var article_controller = new FetchArticles();

        if (nextProp.location.search !== this.props.location.search) {
            article_controller.interest(topic)
                .then(value => {
                    this.setState({ posts: value, loading: false })
                    this.data_store = value;

                })
                .catch(err => {
                    this.setState({ loading: false })
                })

        }
    }



    handleEnter =(e)=>{

        if (e.key ==="Enter"){
            this.search_with_criteria()
        }
    }


isFollowing(category){
    var item = this.parseMatch(this.props.location.search);
    let isreturn;

    category.forEach(element => {
        if(element == ["Poetry"]){
            isreturn = true
        }
    });

    let res = category.some(x => x[0] == "Poetry")
    return res



    
    //  let isreturn = category.includes(["Poetry"]);
    //  console.log(this.props.ProfileReducer, isreturn)

    
}

clickFollow = (e) =>{
    var item = this.parseMatch(this.props.location.search);
    let add = new ProfileUpdate;
    console.log(item, "THESE ARE ITEMS")
    add.addToFavorites(item)
    .then(resolved => alert("added "+resolved))
    .catch(e =>{
        alert("failed")
        console.log(e)
    } 
    )
    
}






    render() {

        var item = this.parseMatch(this.props.location.search);


        if (item == "empty" || item.length == 0) {
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
                <p>Oops, seems no one has been talking about this lately.</p>
                <p>Be the first to discuss it.</p>
            </div>)
        }



        else if (this.state.loading == true) {
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
                <p>Loading....</p>
            </div>)
        }




        else if (this.state.posts.length > 0) {
            return (
            <Container>
            <div className="comment-div" style={{ marginTop: "50px !important" }}>
            <div style={{margin:"35px auto"}}>
            <h1> {item} </h1>
            {this.isFollowing(this.props.ProfileReducer.followed_topics) == true ? <b style={{color:"silver"}}>Following</b>: <b onClick={this.clickFollow } style={{cursor:"pointer" }}>Follow #{item} &nbsp;&nbsp;&nbsp;&nbsp;<Icon name="plus circle" size="big" color="black" /> </b>}
            </div>
                <Form size="small" style={{marginVertical:"50px"}}>
                    <Input id='search' className='custom-input' maxLength='50' value={this.state.search} onChange={this.onChangeSearch}  onKeyDown={this.handleEnter} placeholder='Search by title and hit enter. e.g The angry bird fight/category'  />
                    {/*<Select name='category' style={{ border: "none" }} value={this.state.search_criteria} onChange={this.handleSearchCriteria} options={this.categoryOptions} />
                    <Button primary icon="search" onClick={this.search_with_criteria} hidden />*/}
                    {this.state.not_found == true ? (<p style={{ color: "black" }}>{`${this.state.search} was not found!`} </p>) : ""}

                </Form>


                 
                <Grid>
                    <Grid.Row stretched style={{margin:"15px auto"}}>
                    {this.state.posts.map((x, index) => {
                        return (  <ListExampleSelection index={index} x={x} />  )

                    })
                    }
                    </Grid.Row>
                </Grid>

            </div>
            </Container>)
        }
        return (

            <div className="comment-div" style={{ marginTop: "0px !important" }}>

                <h4>Oops! Nothing here yet.</h4>
                <p>Click New Story to be the first</p>
            </div>
        )


    }



}
/*
<div key={x._id}>
<a href={x.post_link} target="__blank" ><h3>#{++index}. {x.title} </h3> </a>
<span>{x.description==""? "-":x.description}</span>
<p style={{ fontSize: "10px" }}>
By <i>{x.author}({ this.props.ProfileReducer.email == x.authorId.email ? "you" :x.authorId.email  })</i></p>                           <br></br>
</div>
*/


const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Interests));







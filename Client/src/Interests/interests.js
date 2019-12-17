import React from 'react';
import '../../Resources/styles/comment.scss';
import { Button, Form, Input, Icon, Select } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';





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
            return (<div className="comment-div" style={{ marginTop: "10px !important" }}>
                <Form size="small" >

                    <Input id='search' className='custom-input' maxLength='50' value={this.state.search} onChange={this.onChangeSearch} placeholder='Search Interests' />
                    <Select name='category' style={{ border: "none" }} value={this.state.search_criteria} onChange={this.handleSearchCriteria} options={this.categoryOptions} />

                    <Button basic size="small" onClick={this.search_with_criteria}> Search <Icon name='chevron right' />
                    </Button>
                </Form>




                <h3>Latest on {item}:</h3>
                {this.state.not_found == true ? (<p style={{ color: "red" }}>{`${this.state.search} was not found!`} </p>) : ""}
                {this.state.posts.map((x, index) => {
                    return (
                        <div key={x._id}>
                            <h3>#{++index}. {x.title} </h3>
                            <span>{x.description}</span>
                            <p style={{ fontSize: "10px" }}>
                            By <i>{x.author}({ this.props.ProfileReducer.email == x.authorId.email ? "you" :x.authorId.email  })</i></p>                           <br></br>
                        </div>

                    )
                })


                }

            </div>)
        }
        return (

            <div className="comment-div" style={{ marginTop: "0px !important" }}>


                <p>Nothing here yet....</p>
            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Interests));







import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import FetchArticles from '../../Controllers/article.controller';





class Interests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            posts: [],
            loading: true
        }

    }


    parseMatch(param) {
        let search =param
        return /\?topic=(.+)/.test(search) == true ? search.match(/\?topic=(.+)/)[1] : "empty";
    }


    componentDidMount() {
        //find topic
        var topic = this.parseMatch(this.props.location.search);
        var article_controller = new FetchArticles();
        article_controller.interest(topic)
            .then(value => {
                this.setState({ posts: value, loading:false })
                console.log(value)
            })
            .catch(err => {
                this.setState({ loading:false })
                console.log(err)
            })


    }
  
    
    componentWillUpdate(nextProp, nextState){

            var topic = this.parseMatch(nextProp.location.search);
            var article_controller = new FetchArticles();

            if(nextProp.location.search !== this.props.location.search){
                article_controller.interest(topic)
                .then(value => {
                        this.setState({ posts: value, loading: false })

                })
                .catch(err => {
                    this.setState({loading: false })
                })

        }
           }











    render() {

        var item = this.parseMatch(this.props.location.search);


        if (item == "empty" || item.length == 0) {
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
                <p>Oops, seems no one has been talking about xxx lately.</p>
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
            <h3>Latest on {item}:</h3>
               { this.state.posts.map((x, index) => {
                   return (
                   <div key={x._id}>
                   <h3>#{++index}. {x.title} </h3>
                    <span>{x.description}</span>
                    <p>By <b>{x.author}</b></p>
                    <br></br>
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







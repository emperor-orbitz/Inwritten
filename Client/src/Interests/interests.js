import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
//import FetchArticles from '../../Controllers/article.controller';


function getmonthName(number) {
    var months = [
        '01', '02', '03', '04', '05', '06',
        '07',
        '08',
        '09', '10', '11', '12'
    ]
    return months[number];

}

function date_to_string(date) {
    var fulldate = new Date(date);
    var month = getmonthName(fulldate.getMonth());
    var year = fulldate.getFullYear();
    var day = fulldate.getDate();
    var convert = `${day}'${month}`;
    return convert;
}

class Interests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            comments: [],
            post_title: ""
        }

    }


    //load_articles = new FetchArticles();

    componentDidMount() {
        console.log(this.props);
    


    }







    parseMatch(){
        let {search} =this.props.location
        return /\?topic=(.+)/.test(search) ==true? search.match(/\?topic=(.+)/)[1] : "empty" ;
    }




    render() {
        console.log(this.props.location.search)
    
        var item = this.parseMatch();
        
        
        if (item =="empty" || item.length == 0){
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
            <p>Oops, seems no one has been talking about xxx lately.</p>
            <p>Be the first to discuss it.</p>
            </div>)
        } 

        return (

            <div className="comment-div" style={{ marginTop: "0px !important" }}>

                <h3 style={{color:"rgb(3, 68, 94)"}}>Latest on: "{item}" </h3>
                    {item}s
            </div>
        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Interests));







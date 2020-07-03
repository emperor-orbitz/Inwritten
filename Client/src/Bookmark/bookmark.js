import React from 'react';
import '../../Resources/styles/profile.scss';
import { Icon, Form, Input,Select, Button, List, Loader, ButtonGroup } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import Connection from '../../Controllers/auth.controller';
import { connect } from 'react-redux';
import ListExampleSelection from "./cards"




function DimmerLoad(props) {
    return <Loader active={props.active} size={props.size} inline />

}




class Bookmark extends React.Component {

    constructor(props) {
        super(props);
        this.data_store=[]
        this.state = {
            bookmarks:[],
            search: "",
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






    handleEnter =(e)=>{

        if (e.key ==="Enter"){
this.search_with_criteria()
        }
    }

    

    onChangeSearch = (e) => {
        var search = e.target.value;
        this.state.not_found == true ? this.setState({ not_found: false }) : "";
        this.setState({ search: search })
    }


    search_with_criteria = () => {

        var { bookmarks, search_criteria, search } = this.state;
        let search_results = bookmarks.filter((v, i) => v[search_criteria]
            .toLowerCase()
            .indexOf(search.toLowerCase()) != -1)

        if (search_results.length === 0 || search.length == 0) {
            this.setState({  not_found: true })
        }
        else
            this.setState({ bookmarks: search_results, not_found: false })


    }
    

    handleSearchCriteria = (e, p) => {

        this.setState({ not_found: false, search_criteria: p.value })
    }


    componentDidMount() {

        //get bookmark list


            fetch('/user/bookmark/list', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("hs_token")
                },
                credentials: 'include',
                withCredentials: true,

            })
                .then(result => result.json())
                .then( result => {
                    console.log(result.bookmarks.bookmarks)
                        this.setState({ bookmarks: result.bookmarks.bookmarks, loading:false })
                })
                .catch(err => {
                    console.log(err, 'Uncalled error')
                });
    }




    render() {

        if ( this.state.bookmarks.length == 0) {
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
                <h4>No bookmark yet. Try reading more</h4>
                <p>Check the latest stories at the sidebar</p>
            </div>)
        }



        else if (this.state.loading == true) {
            return (<div className="comment-div" style={{ marginTop: "0px !important" }}>
                <p>Loading....</p>
            </div>)
        }

        else
        return (
            <div className="comment-div" style={{ marginTop: "10px !important" }}>
                <Form size="small" >

                    <Input id='search' className='custom-input' maxLength='50' value={this.state.search} onChange={this.onChangeSearch}  onKeyDown={this.handleEnter} placeholder='Search by title and hit enter. e.g The angry bird fight/category'  />
                  {/*  <Select name='category' style={{ border: "none" }} value={this.state.search_criteria} onChange={this.handleSearchCriteria} options={this.categoryOptions} />
                    <Button primary icon="search" onClick={this.search_with_criteria}/>
        */}
                </Form>


            <p>{this.state.not_found == true ? <div className='error-notification'> No {this.state.search_criteria} similar to <b> {this.state.search}</b> was found</div> : ''}</p>
                <h3> Bookmarks:</h3>

                <List selection verticalAlign="middle">

                    {this.state.bookmarks.map((x, index) => {
                        return (
                            <div style={{ minHeight: "50px", width: "100%" }}>
                                <List divided relaxed>

                                    <ListExampleSelection index={index} x={x} />

                                </List>

                            </div>
                        )

                    })


                    }
                </List>

            </div>)

    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Bookmark));







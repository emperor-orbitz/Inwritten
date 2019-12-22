import React from 'react';
import '../../Resources/styles/comment.scss';
import { Icon, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import '../../Resources/styles/react-carousel.scss';






class Templates extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            posts: [],
            loading: true
        }

    }




    render() {

        return (
            <div className="comment-div" style={{ marginTop: "0px !important" }}>
                <h3 style={{ color: "black" }}>Templates</h3>
                <p>Select one. Templates are the different designs in which your articles can be rendered.</p>
                <br></br>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={3}
                >
                    <Slider style={{ height: "400px", width:'700px', color: 'black !important', boxShadow: '2px 1px 17px 2px rgba(82, 82, 82, 0.4)' }}>
                        <Slide index={0} > <h2>TEMPLATE-DEFAULT-01</h2></Slide>
                        <Slide index={1}> <h2>TEMPLATE-STARTER-02</h2></Slide>
                        <Slide index={2}> <h2>TEMPLATE-NOVA-03</h2></Slide>
                    </Slider>
                    <ButtonBack style={{ background: 'black', color: 'white', marginRight: '10px', border: 'none', padding: "8px 15px" }}><Icon name='arrow left'/></ButtonBack>
                    <ButtonNext style={{ background: 'black', color: 'white', border: 'none', padding: "8px 15px" }}><Icon name='arrow right'/></ButtonNext>
                </CarouselProvider>




            </div>


        )


    }






}

const mapStateToProps = (state) => {
    return state;
}

export default withRouter(connect(mapStateToProps)(Templates));







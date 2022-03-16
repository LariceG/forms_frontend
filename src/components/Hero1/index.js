import React, { Component } from 'react'
import {Link}  from 'react-router-dom';
import heroimg from '../../images/slider/hero-shape.png'

import './style.css'

export default class Hero1 extends Component {
    // Constructor 
    constructor(props) {
        super(props);
    
        this.state = {persons: []};
      }
   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        this.personsList();
      }
      personsList() {
        const defaultOptions = {
            headers: {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjUwNGNmYjUxMjhlNTVlNDFmOTRmMiIsImZpcnN0bmFtZSI6IkF2aW5hdiIsImxhc3RuYW1lIjoiQWVyeSIsImVtYWlsIjoiYWFAYS5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImlhdCI6MTY0NTE2OTY4NCwiZXhwIjoxNjQ3NzYxNjg0fQ.iuTjR1j6CNXC5WB6lXObUhrM_GI2dogtg1u4ZkZfIj8',
            },
          };
        fetch(
"http://localhost:3001/api/persons", defaultOptions)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    persons: json,
                    DataisLoaded: true
                });
            });
      }
    render() {
     console.log(this.state.persons);
     
    return(
        
        <section className="wpo-hero-style-2" >
            
            <div className="wpo-slide-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col col-md-8 slide-caption">
                            <h2 className="wow fadeInLeftSlow" data-wow-delay="1.0s">I’m <span>John</span> Smith</h2>
                           
                            <p className="wow fadeInUp" data-wow-delay="1.5s">Freelance UI/UX Designer</p>
                            <div className="bg-social wow fadeInUp" data-wow-delay="2.0s">
                                <ul>
                                    <li><Link to="/"><i className="fa fa-facebook"></i></Link></li>
                                    <li><Link to="/"><i className="fa fa-linkedin"></i></Link></li>
                                    <li><Link to="/"><i className="fa fa-instagram"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wpo-slide-right-img">
                    <div className="slide-img wow fadeInRightSlow" data-wow-duration="2000ms">
                        <img src={heroimg} alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
    }
}
//export default Hero1;
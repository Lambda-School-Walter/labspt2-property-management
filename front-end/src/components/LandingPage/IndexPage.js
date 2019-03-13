import React from 'react'
import PropTypes from 'prop-types';
import Wave from './Wave';
import '../general.css'


const IndexPage = () => (
  <div>
    <div className="Hero">
      <div className="HeroGroup">
        <h1>Property management <br />made easier.</h1>
        <p>Manage tasks, payments, work orders anywhere, anytime. </p>
        <button>Get Started</button>
        <Wave />
      </div>
    </div>  
  </div>

)

IndexPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default IndexPage
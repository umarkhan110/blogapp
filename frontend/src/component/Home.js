import React from 'react'
import {NavLink} from "react-router-dom";

const Home = () => {
     return (
            <div className="home1">
                <div className="home1_1">
                <NavLink to="/blog" className="button"><button>Create Blog</button></NavLink>
                <p>Publish your passion here, your way</p>
                </div>
            </div>
       
    )
}

export default Home

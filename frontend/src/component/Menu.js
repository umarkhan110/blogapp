import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";
import { FaBars } from 'react-icons/fa';

const Menu = () => {

    return (
        <>
            <div className="header">
                <input type="checkbox" id="check"></input>
                <h1 className="khas">Blogger</h1>
                <ul>
                    <li><NavLink exact to="/" activeClassName="active_class">Home</NavLink></li>
                    <li><NavLink exact to="/blog" activeClassName="active_class" >Blog</NavLink></li>
                    <li><NavLink exact to="/signin" activeClassName="active_class">Login</NavLink></li>
                    <li><NavLink exact to="/logout" activeClassName="active_class">Logout</NavLink></li>
                    <li><NavLink exact to="/signup" activeClassName="active_class">Register</NavLink></li>
                </ul>
                <label for="check" className="checkbtn">
                    <FaBars />
                </label>
            </div>
        </>);
};

export default Menu;
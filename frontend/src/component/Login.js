import React, { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {

  const history = useHistory();
  const [input, setInput] = useState({
    email: '',
    password: ''
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevInput => {
      return {
        ...prevInput,
        [name]: value
      }
    })
  }
  const handleClick = async (event) => {
    event.preventDefault();
    //console.log(input.lemail);
    const { email, password } = input;
    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })

    });

    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid");
    } else {
      // dispatch({type:"USER", payload:true});
      history.push("/");
    }

  }


  return <>
    <div className="mains_s">
      <div className="mainl">
        <form method="POST">
          <h3>Sign in to Blogger</h3>
          <input onChange={handleChange} className="one" type="text" name="email" placeholder="Email or Phone" value={input.email}></input>
          <br></br>
          <input onChange={handleChange} className="two" type="password" name="password" placeholder="Password" value={input.password}></input>

          <div className="signin_btn" >
            <NavLink to="/signup" className="button">Create account</NavLink>
            <button className="btn" onClick={handleClick}>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Login

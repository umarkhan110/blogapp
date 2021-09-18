import React, {useState, useRef} from 'react'
import {NavLink, useHistory} from "react-router-dom";  
//import axios from "axios"; 
//import "bootstrap/dist/css/bootstrap.min.css"; 
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
//import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
      return (
        <div className="altr">
          This field is required!
        </div>
      );
    }
  };
  
  const vemail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alertemail">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vfname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="altr">
          Name must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 8 || value.length > 40) {
      return (
        <div className="vcaltr">
          The password must be between 8 and 40 characters.
        </div>
      );
    }
  };

  const vcpassword = (value) => {
    if (value.length < 8 || value.length > 40) {
      return (
        <div className="vcaltr">
         The password must be between 8 and 40 characters.
        </div>
      );
    }
  };
  
const Signup = () => {
  const form = useRef();
 // const checkBtn = useRef();
    const history = useHistory();
    const [input, setInput] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: ''
        });
        function handleChange (event){
        const {name, value} = event.target;
        setInput(prevInput =>{
        return{
        ...prevInput,
        [name]: value
        }
        })
        }
        const handleClick= async (event)=>{
        event.preventDefault();
        form.current.validateAll();
        const {  fname,lname,email,password, cpassword}  = input;
            
            //axios.post('http://localhost:3001/npeopl', cnewUsr);
            const res = await fetch('/signup',{
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fname,lname,email,password, cpassword
                })
            });
        const data = await res.json();
        //console.log(data.message)
        if (res.status === 422 || !data){
            window.alert(data.message);
            //console.log("invalid");  
        }else{
            window.alert("Account is created Successfully");
            history.push("/signin");
        }
        }
    return (
        <div className="mains_s">
        <div className="mains">
        <Form method="POST"  ref={form}>
             <h3>Create Blogger's Account</h3>
             <div className="sflname">
               <div   className="sname" >
              <Input  onChange={handleChange} className="sname" type="text" name="fname" 
              placeholder="First Name"  value={input.fname} validations={[required, vfname]} /></div>
               <div  className="sname">
              <Input  onChange={handleChange} className="sname" type="text" name="lname" 
              placeholder="Last Name"  value={input.lname} /></div>
              </div>
              <div className="gname">
              <Input   onChange={handleChange} className="gname" type="text" name="email" 
              placeholder="example123@gmail.com"  value={input.email} validations={[required, vemail]} />  </div>           
              <div className="spass">
              <div   className="sname" >
              <Input  onChange={handleChange} className="sname" type="text" name="password" 
              placeholder="Password"  value={input.password} validations={[required, vpassword]} /></div>
              <div   className="sname" >
              <Input   onChange={handleChange} className="sname" type="text" name="cpassword" 
              placeholder="Confirm"  value={input.cpassword} validations={[required,vcpassword]} /></div>
              </div>
              <div className="signup_btn" >
              <NavLink to="/signin" className="button">Sign in Instead</NavLink>
              <button className="btn" onClick={handleClick}>Sign Up</button>
             </div>  
             
             </Form>
        </div>
        </div>
    )
}

export default Signup


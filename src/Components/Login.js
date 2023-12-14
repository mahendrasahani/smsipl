import React, { useState } from 'react';
import Mail from "./assests/mail.png"
import Lock from "./assests/lock.png";
import Logo from "./assests/logo3.png"
import Custombutton from './reusable/CustomButton';
import Custominput from './reusable/CustomInput';

const Login = () => {
    const [login,setLogin]=useState(false)
  
    const [formdata,setFormdata]=useState({
      email:"",
      password:""
    })

 const handleFormdata=(e)=>{
  const {name, value } =e.target;
  setFormdata({ ...formdata, [name]: value });
 }
  return (
    <div className='login'>
       <div className='logo-part'>
        
       </div>
       <div className='form-part'>
        <img className='logo' src={Logo} alt="img" />
        <div className='form-inside'>
        <h1>Hello Again!</h1>
          <h3>Welcome Back,Please login to continue</h3>
          <form className='form' action='/admin'>

            <Custominput img={Mail} type={"email"} value={formdata.email} handleChange={handleFormdata} placeholder={"Email Address"}/>

            <Custominput img={Lock} type={"password"} value={formdata.password} handleChange={handleFormdata} placeholder={"Password"}/>


            <Custombutton data={"Login"}/>
          </form>
        </div>
         
       </div>
    </div>
  );
}

export default Login;

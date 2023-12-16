import React, { useState } from 'react';
import Mail from "../assests/mail.png"
import Lock from "../assests/lock.png";
import Logo from "../assests/logo3.png"
import Custombutton from '../reusable/CustomButton';
import Custominput from '../reusable/CustomInput';
import { useSelector } from 'react-redux';

const Login = () => {

    const [error,setError]=useState(false)
    const value=useSelector(state=>state.hiddenstate.loginCredentials.email);  
    
    const [formdata,setFormdata]=useState({                                                        //form data variables
      email:"",
      password:""
    })

 const handleFormdata=(e)=>{
  e.preventDefault()
  const {name, value } =e.target;
  setFormdata({
    ...formdata,
    [name]: value,
  });
 }


 const handleSubmit=(e)=>{
   if(value[0]!==formdata.email){
    setError(true)
    e.preventDefault()
   }
   else{
    setFormdata({ ...formdata, email: '', password: '' });
   }

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
          <form className='form' action='/admin' onSubmit={handleSubmit}>

            <Custominput img={Mail} name={"email"} type={"email"} value={formdata.email} handleChange={handleFormdata} placeholder={"Email Address"}/>

            <Custominput img={Lock} name={"password"} type={"password"} value={formdata.password} handleChange={handleFormdata} placeholder={"Password"}/>


            <Custombutton data={"Login"}/>
          </form>
          {
            error&&<p style={{textAlign:"center",color:"red"}}>❌You are not a member.Please Signin first.</p>
          }
            
        </div>
         
       </div>
    </div>
  );
}

export default Login;

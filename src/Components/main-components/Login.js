import React, { useEffect, useState } from 'react';
import Lock from "../assests/lock.png";
import Logo from "../assests/logo3.png"
import Custombutton from '../reusable/CustomButton';
import Custominput from '../reusable/CustomInput';
import User from "../assests/user.png"
import Apis from '../../Services/ApiServices/Apis';


const Login = () => {

    const [error,setError]=useState(false)
    const URL=process.env.REACT_APP_API||"http://dpw1.afrilogitech.com/api";
    const [formdata,setFormdata]=useState({                                                        //form data variables
      username:"",
      password:""
    })
    const token=localStorage.getItem('token')||0;


    useEffect(()=>{
         if(token){
          window.location.href="/admin/dashboard";
         }
    },[token])



    const handleSubmit=async(e)=>{
    e.preventDefault();
      
      // let config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url: 'http://dpw1.afrilogitech.com/api/Authentication',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data : data
      // };
      
      // await axios.request(config)
      // .then((response) => {
      //   // console.log(response.data.token);
      //   localStorage.setItem("token",response.data.token)
      //   window.location.href="/admin";
      // })
      // .catch((error) => {
      //   console.log(error);
      // });

     
        var apiResponseData = await Apis.Authentication('http://dpw1.afrilogitech.com/api',formdata);
        console.log(apiResponseData.token)
          localStorage.setItem("token",apiResponseData.token)
          window.location.href="/admin/dashboard"; 
    }

 
 const handleFormdata=(e)=>{
  e.preventDefault()
  const {name, value } =e.target;
  setFormdata({
    ...formdata,
    [name]: value,
  });
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
          <form className='form' method='post' action='/admin' onSubmit={(e)=>handleSubmit(e)}>

            <Custominput img={User} name={"username"} type={"text"} value={formdata.username} handleChange={handleFormdata} placeholder={"Username"}/>

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

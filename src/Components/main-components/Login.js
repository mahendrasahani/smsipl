import React, { useState } from 'react';
import axios from 'axios';
import Lock from "../assests/lock.png";
import Logo from "../assests/logo3.png"
import Custombutton from '../reusable/CustomButton';
import Custominput from '../reusable/CustomInput';
import { useSelector } from 'react-redux';
import User from "../assests/user.png"


const Login = () => {

    const [error,setError]=useState(false)
    const value=useSelector(state=>state.hiddenstate.loginCredentials.userInfo);             //get email of signed user
    const URL=process.env.REACT_APP_API||"http://dpw1.afrilogitech.com/api";
    const [formdata,setFormdata]=useState({                                                        //form data variables
      username:"",
      password:""
    })

   
   
   


 const handleSubmit=async(e)=>{
    e.preventDefault()
  try{
    const response=await axios.post(`${URL}/Authentication`,{
      headers:{
        "Access-Control-Allow-Origin": "*/*",
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formdata),
    });
    

    if(!response.ok){
      console.log(response.status)
    }
    else{
      const data=await response.token;
    }
  }
  catch{

  }
  
 }


   
    // const HandleLogin=async()=>{

      // let data = JSON.stringify({
      //   "username": "TPA_APIUser",
      //   "password": "AccTKN@2010"
      // });
      
      // let config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url: 'http://dpw1.afrilogitech.com/api/Authentication',
      //   headers: { 
      //    
          
      //   },
      //   data : data
      // };
      
      // axios.request(config)
      // .then((response) => {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch((error) => {
      //   console.log(error);
      // });



    //   try {
    //     const response = await fetch(`${URL}/Authentication`, {
    //       method: 'POST',
    //       headers:
    //      {
    //        "Accept": "application/json",
    //        "Content-Type": "application/json",
    //     },
    //     body:JSON.stringify(formdata),
    //     });
    
    //     if (!response.ok) {
    //       console.error('Authentication failed:', response.statusText);

    //     } else {
    //       const data=await response.json();
    //       localStorage.setItem("token",data.token);
    //       window.location.href = '/admin'; 
    //     }
    //   } catch (error) {
    //     console.error('Request failed:', error.message);
      
    //   }
    // }

    // const handleSubmit =(e) => {
    //   e.preventDefault();
    //   HandleLogin();
    // };
    
 
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

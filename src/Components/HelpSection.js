import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const HelpSection = () => {
    const hidden = useSelector((state) => state.hiddenstate.hidden);




  return (
    <div className="wrapper">
    <Header/>

    <Sidebar />

    <div className="content-wrapper" style={{ marginLeft: hidden && "0" }}>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12">
              <h1
                className="m-0"
                style={{ color: "#1B106D", fontWeight: "bold" }}
              >
                Help Section
              </h1>
              <ol className="breadcrumb ">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item active">Help Section</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
          <div className="container-fluid"> 
      <div className='help-section'>
    
      
        <div>
            <h5>Login Page</h5>
            <img src="img/login.png" alt="img" />
            <div className='help-details'>
                <hr />
            <p>- This is the login page ,where you have to input your credentials to login.</p>
            <p>- If credentials are correct,you will be redirected to admin dashboard page,otherwise error will show up "wrong credentials".</p>
            </div>
           
        </div>
        <div>
        <h5>Dashboard Page</h5>
        <img src="img/dashboard.png" alt="img" />
          <div  className='help-details'>
            <hr />
          <p>- This is the admin dashboard page,which is divided into two parts one is for filteration and other part is piechart.</p>
            <p>- In the filteration part,there are two date input where you have to select specific dates for which you want the data,default values for these date input is today's date.</p>
            <p>- Then there are two buttons ,one is clearAll which when clicked,all filters resets to default values i.e todays date will be shown.</p>
            <p>- The second button download excel sheet,will download an excel file according to the date filters you choose.</p>
            <p>- Then there is second part which is a piechart of message details ,which shows us no. of successful and failed messages on choosen dates.</p>
          </div>
        </div>

        <div>
        
        <img src="img/logout.png" alt="img" />
          <div  className='help-details'>
            <hr />
          <p>- When someone click on user icon , a logout popup will open,when clicked ,user will get logout</p>
          
          </div>
        </div>
        <div>
        <h5>Message Page</h5>
        <img src="img/message.png" alt="img" />
        <div  className='help-details'>
            <hr />
        <p>- This the the message page,which shows the list of messages.</p>
            <p>- This page also contains two section one for filters which consists of date inputs ,a select box having two values i.e transfer successful and transfer failed,a select box of vessel visit code,a select box of cargo code,a input field of mrn number,a input field of carrier name and two buttons ,one for search and one for clear all filters.</p>
            <p>- Second one is list of all messages in a table.</p>
            <p>- In table ,thare are details og messages i.e date of creation,mrn number,vessel visit code,bol count,status and three actions</p>
            <p>- The three action button works as defined:
                <ul>
                <li><b>View :</b>When clicked,the user navigates to message details page which shows the message details of individual messages.</li>
                <li> <b>Reprocess :</b> This button only be seen when there is status details insertion failed and transfer failed and  used for reprocess message.</li>
                <li> <b>View Json :</b> This button will open a model when clicked which contains the message detail in JSON format. </li>
                </ul>
               

            </p>
        </div>
          
           
        </div>
        <div>
            <h5>Message Details Page</h5>
        <img src="img/message1.png" alt="" />
        <hr />
            <p>- This is the message details page ,will open when clicked on view button on message list page.</p>
            <p>- This page contains the message details ,firstly there will be vessel details shown at the top.</p>
        </div>
        <div>
        <img src="img/message2.png" alt="" />
        <img src="img/message5.png" alt="" />
        <hr />
            <p>- Then there is a list of bollist errorlist which shows the error in each bollist when there is error.</p>
            <p>- This also have a action button which is used to modify details by navigating the user to modify page.</p>
            <p>- If there is no error, it will show successful message at status ,with download button by which u can download an excel file.</p>
        </div>
       

        <div>
            <img src="img/message3.png" alt="" />
            <hr />
            <p>- Then there is  one select box for selecting the bol number that  u want to see bollist details.</p>
            <p>- Other one is a input field ,by which u can get the details of a bollist by writing the bol number inside input field.</p>
        </div>

        <div>
            <img src="img/message4.png" alt="" />
            <hr />
            <p>- Here you will see the details of bolcargos,bolcontainers and bolvehicles.</p>
            <p>- At the top right section ,you can select the different bolcargo or bolcontainers or bolvehicles.</p>
            <p>- Then there is a reporcess button,which will reprocess the message if the message is transfer failed or details insertion failed.</p>
        </div>

        <div>
        <h5>Modify Page</h5>
            <img src="img/modify1.png" alt="" />
            <hr />
            <p>- This is the modify page,when u can modify the bollist data.</p>
            <p>- Here is the list of bollist data which u can modify.</p>

            <img src="img/modify2.png" alt="" />
            <hr />
            <p>- Then there is the bolcargo details, bolcontainers details and bolvehicles details ,which u can modify.</p>
            <p>- Whenever u select one cargo, after editing it u have to click the save button which will save the details and then u can  go to another bolcargo data,same procedure can followed for both bolcontainers and bol vehicles.</p>

            <img src="img/modify3.png" alt="" />
            <hr />
            <p>- Then at the last there is save and edit button ,which will save whole data and modify it.</p>
            
         
        </div>
     
    </div>
    </div>
    </section>
    
    </div>
    <aside className="control-sidebar control-sidebar-dark"></aside>
  </div>


  );
}

export default HelpSection;

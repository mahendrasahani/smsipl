import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const MessageDetails = ({items}) => {
  const {id}=useParams();
 
    const value=useSelector(state=>state.hiddenstate.hidden);
    const itemsData=items.filter((item)=>{
      return item.id===parseInt(id)
    })

    console.log(itemsData)
 
    const style1={
       margin:"90px auto",
       width:"90%",
    }

  return (
    <div className='message-container messages' style={!value?style1:null}>
      <p style={{margin:"8px 0px 0px 20px"}}>Message Detail</p>
      
      <div className='message-box1'>
        <span>
            <p>Date</p>
            <div className='message-status'><p >{itemsData[0].date}</p></div>
        </span>
        <span> 
            <p>Status</p>
             <div className='message-status'><p >{itemsData[0].status}</p></div>
            </span>
        
      </div>
      <div className='message-box'>
      <p>Message </p>
         <p className='message'>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor atque distinctio vero id quia enim voluptate quibusdam quos voluptatem mollitia magnam in, omnis laboriosam nihil minima natus! Exercitationem optio unde nostrum ab odit quidem beatae ullam, iste debitis iusto quaerat voluptatum veritatis velit tempore autem fugiat ipsa eos, aperiam hic vitae nesciunt magni nihil quas! Numquam autem magnam ratione iusto voluptas recusandae, laboriosam aliquid hic eos vel exercitationem omnis facere consequatur tenetur odit ipsa eligendi commodi reiciendis quod.
         </p>
         {/* <textarea class="message"></textarea> */}
      </div>
      
      
        <div className='span-box'>
        <span>
          <p>Error Details</p>
          <p  className='error'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatibus alias aliquam inventore perspiciatis dolorum, pariatur nam magni nemo reprehenderit. </p>
        </span>
        </div>
     
      

      <div className='button-box'>
      <button>PROCESS</button>
     <Link to={"/admin"}> <button>CLOSE</button></Link>
      </div>
    </div>
  );
}

export default MessageDetails;

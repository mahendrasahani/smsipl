import React from 'react';

const Users = () => {
  return (
    <div className='user-page'>
        <div>
        Sorry for the inconvenience,this page is not available right now
       <button   className="btn btn-block text-white mt-2 save"
                style={{ backgroundColor: "#547899" }} onClick={()=>window.location.href="/dashboard"}>GO BACK</button>
        </div>
    
    </div>
  );
}

export default Users;

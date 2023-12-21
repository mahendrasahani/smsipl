import React from 'react';

// const Button=styled.button`
// background:#0575E6;
// padding: 14px;
// border-radius: 50px;
// color: white;
// border: none;
// cursor: pointer;
// `;

const Custombutton = ({data}) => {
  return (
    <>
       <button className='button' type='submit'><p>{data}</p></button>
       </>
  );
}

export default Custombutton;

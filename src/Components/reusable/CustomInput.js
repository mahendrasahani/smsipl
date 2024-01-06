import React from 'react';
import styled from 'styled-components';


const Span=styled.span`
display: flex;
align-items:center;
gap: 10px;
padding-left:30px;
border-radius:50px;
border: 1.47px solid  rgba(185, 185, 185, 1);
width: 411px;
height: 50px;

@media (max-width: 768px) {
 width:80%;
 margin:auto;
}
  
}
`

const Custominput = ({img,type,inputValue,handleChange,placeholder,name}) => {
  return (
      <>
      <Span>
      <img src={img} alt="img" />
      <input type={type} value={inputValue} name={name} onChange={handleChange} placeholder={placeholder} required/>
      </Span>
        
      </>
  );
}

export default Custominput;

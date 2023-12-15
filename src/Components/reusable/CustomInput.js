import React from 'react';
import styled from 'styled-components';


const Span=styled.span`
display: flex;
align-items:center;
gap: 10px;
padding: 8px;
border-radius:50px;
border: 1.47px solid  #B9B9B9;
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

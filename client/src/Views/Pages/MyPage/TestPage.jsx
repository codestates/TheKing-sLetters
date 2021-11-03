import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
flex-wrap: nowrap;

> div {

margin: 10px;
padding: 10px;
width:400px;
height: 600px;
border : 1px solid black;

> div {
  margin: 0 auto;
  width: 300px;
  height: 150px;
  border: 1px solid black;
}

> img {
  /* margin: 10px;
padding: 10px;
width:150px;
height: 150px;
border : 1px solid black; */
}
 
}
`;

const TestPage = (props) => {
  return (
      <Div>
        <div>
          <div></div>
          {/* <img src=""></img> */}
        </div>
        <div>
          <div></div>
          {/* <img src=""></img> */}
        </div>
        <div>
          <div></div>
          {/* <img src=""></img> */}
        </div>          
      </Div>
  )
}
      
  

export default TestPage;
import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'

const Div = styled.div`
position: fixed;
z-index: 999;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: white;
display: grid;
place-items: center;
.moving {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background:  url('https://cdn.discordapp.com/attachments/830706676852064307/900914511006027826/115517_5bbc1895b0215-removebg-preview.png') 0 top / 120% repeat-x;
    background-size: 50% 100%;
    animation: movebg 40s linear infinite;
}
`;

const GoogleAuth = (props) => {
  useEffect(() => {
    const url = new URL(window.location.href)
    console.log(url)
    if(url.searchParams.get('code')) {
      const authorizationCode = url.searchParams.get('code')
      axios.get(`https://api.thekingsletters.ml/auth/google?code=${authorizationCode}`)
      .then((res) => localStorage.setItem('accessToken', res.data.data.accessToken))
      .then(() => window.location='/')
      .catch(() => {alert('해당 이메일로 가입된 계정이 존재합니다.'); window.location='/'})
    }
  }, [])
  
  return (
      <Div>
        <div className="moving"></div>
      </Div>
  )
}
      
  

export default GoogleAuth;

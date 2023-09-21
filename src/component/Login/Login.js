import React, { useState,BrowserRouter,Routes } from 'react';



import './Login.css';
import SocialKakao from '../KakaoLogin/KakaoLogin.jsx';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(0);

  const handleIdChange = (e) => {
    setId(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  // 이 함수는 실제 서버에 요청을 보내는 코드로 대체해야 합니다.
  // 현재는 단순히 아이디와 비밀번호가 일치하는지 확인합니다.
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(id === "admin" && password === "admin") { 
      setLoginStatus(1);
      alert("로그인 성공!");
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  }

 return (
   <div>
     <form className="login_form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
       <input type="text" placeholder="ID" value={id} onChange={handleIdChange} />
       <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
       <button type="submit">로그인</button>
     </form> 
    <SocialKakao/>
    {/* 카카오 로그인 */}
   </div>
 )
}


export default Login;

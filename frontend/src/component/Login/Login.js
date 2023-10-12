import React, { useState,BrowserRouter,Routes } from 'react';



import './Login.css';
import SocialKakao from '../KakaoLogin/KakaoLogin.jsx';

function Login() {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  }
  // const [id, setId] = useState('');
  // const [password, setPassword] = useState('');
  // const [loginStatus, setLoginStatus] = useState(0);

  // const handleIdChange = (e) => {
  //   setId(e.target.value);
  // }

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // }

  // 이 함수는 실제 서버에 요청을 보내는 코드로 대체해야 합니다.
  // 현재는 단순히 아이디와 비밀번호가 일치하는지 확인합니다.
  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   if(id === "admin" && password === "admin") { 
  //     setLoginStatus(1);
  //     alert("로그인 성공!");
  //   } else {
  //     alert("아이디 또는 비밀번호가 잘못되었습니다.");
  //   }
  // }

 return (
   <div>
    {/*서비스 약관*/}
    <div className="service">
      <ul style={{listStyle:"none", padding:"0"}}>
        <li>이용약관</li>
        <textarea name="service" id="service" cols="50" rows="10">
        개인정보보호법에 따라 "태클" 에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.

 

        1. 수집하는 개인정보
        이용자는 회원가입을 하지 않아도 정보 검색, 게시판 열람 등 대부분의 "태클" 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 글쓰기, 댓글작성 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, "태클" 은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.

        

        2. 회원가입 시점에 "태클" 가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
        - 회원 가입 시 필수항목으로 아이디, 비밀번호, 이름, 이메일주소, 닉네임, 선택항목으로 본인확인 이메일주소를 수집합니다. 

        

        3. 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보, 위치정보가 생성되어 수집될 수 있습니다.

        

        4. 개인정보 수집 및 이용 동의를 거부할 권리
        이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.
        </textarea>
      </ul>
      {/*약관 동의 체크박스*/}
     <div className="agreement">
       <input type="checkbox" id="agree" checked={isAgreed} onChange={handleAgreementChange} />
       <label htmlFor="agree">서비스 약관에 동의하십니까?</label>
     </div>

      </div>
     {/* <form className="login_form" onSubmit={handleSubmit}>
      <h2>Sign in</h2>
       <input type="text" placeholder="ID" value={id} onChange={handleIdChange} />
       <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
       <button type="submit">로그인</button>
     </form>  */}
    <SocialKakao/>
    {/* 카카오 로그인 */}
   </div>
 )
}


export default Login;

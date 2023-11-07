import React, { useState, useEffect } from 'react';
import './Login.css';
import SocialKakao from '../KakaoLogin/KakaoLogin.jsx';

function Login() {
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
  });

  // "전체 동의" 체크박스 상태
  const [selectAll, setSelectAll] = useState(false);

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements({
      ...agreements,
      [name]: checked,
    });
  };

  // "전체 동의" 체크박스를 클릭할 때
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setAgreements({
      agree1: checked,
      agree2: checked,
      agree3: checked,
    });
  };

  // agreements 상태가 변경될 때마다 전체 동의 체크박스 상태를 업데이트
  useEffect(() => {
    const allAgreed = Object.values(agreements).every((agreement) => agreement);
    setSelectAll(allAgreed);
  }, [agreements]);

  const handleLogin = () => {
    if (!Object.values(agreements).every((agreement) => agreement)) {
      alert("서비스 약관에 모두 동의해주세요.");
    }
  };

  return (
    <div>
      <h1>이용약관</h1>
        <ul className="agreements">
          <li>
            <input type="checkbox" name="agree1" checked={agreements.agree1} onChange={handleAgreementChange} />
            <label htmlFor="agree1">이용약관 동의 (필수)</label>
          </li>
          <li>
            <input type="checkbox" name="agree2" checked={agreements.agree2} onChange={handleAgreementChange} />
            <label htmlFor="agree2">개인정보 수집 및 이용동의 (필수)</label>
          </li>
          <li>
            <input type="checkbox" name="agree3" checked={agreements.agree3} onChange={handleAgreementChange} />
            <label htmlFor="agree3">개인정보의 취급위탁 동의(필수)</label>
          </li>
        </ul>
        <div className="check">
          <input type="checkbox" id="selectAll" checked={selectAll} onChange={handleSelectAllChange} />
          <label htmlFor="selectAll">전체 동의</label>
        </div>
        {Object.values(agreements).every((agreement) => agreement) && <SocialKakao />}
    </div>
  )
}

export default Login;


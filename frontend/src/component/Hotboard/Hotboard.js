import React from 'react';
import { Link } from 'react-router-dom';
import Write_btn from '../Write_btn/Write_btn';
import Board from '../Board/Board.js';

// Login.js
// Hello, Component! 라는 문자열을 담은 div 요소 Login 만들기
// 컴포넌트의 첫글자는 무조건 대문자로 작성해야함!
const Hotboard = () => {
    return (
      <div>
        <Board />
      </div>
    );
  };
  // 만든 컴포넌트 모듈로 사용하기 위해 내보내기
  export default Hotboard;
import React from 'react';
import Write_Btn from '../Write_btn/Write_btn.js';

// Login.js
// Hello, Component! 라는 문자열을 담은 div 요소 Login 만들기
// 컴포넌트의 첫글자는 무조건 대문자로 작성해야함!
const Board = () => {
    return (
      <div>
          <span>
            Hello, V/S Board Component!
          </span>
          <Write_Btn /> {/* 글쓰기 버튼 */}
      </div>
    );
  };
  // 만든 컴포넌트 모듈로 사용하기 위해 내보내기
  export default Board;
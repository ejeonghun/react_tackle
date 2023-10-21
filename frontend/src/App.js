import { BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import Login from './component/Login/Login.js';
import Nav, { Boardlist } from './component/Nav/Nav.js';
import VSBoard from './component/VSBoard/VSBoard.js';
import Participationboard from './component/Participationboard/Participation.js';
import Hotboard from './component/Hotboard/Hotboard.js';
import KakaoCallback from './component/KakaoLogin/KakaoCallback.tsx';
import Main from './component/Main/Main.js';
import Mypage from './component/Mypage/Mypage.js';
import Point from './component/Mypage/Function/Point.js';
import { AuthProvider } from './component/AuthContext/AuthContext.js';
import Write from './component/Write/Write.js';
import Logout from './component/Logout/Logout.js';
import Category from './component/Category/Category.js';
import CategoryBoard from './component/CategoryBoard/CategoryBoard.js';
import Support from './component/Support/Support';
import Vote from './component/Vote/Vote';


    // 메인 페이지 구성
    // 네비바와 푸터를 작성해주고 나머지는 컴포넌트로 구성한다.
    // 메인 페이지에 들어갈 컴포넌트의 구성으로는 실시간으로 Top 3을 보여주는 게시글 컴포넌트
    // 이 사이트는 사이트 이용자가 어떠한 주제에 대하여 글을 작성하고 선택지는 두개 혹은 3개로 주어지고
    // 이 사이트를 이용하는 사람들이 투표를 하여 가장 많은 표를 받은 글이 Top 3에 올라가게 된다.
    // 투표는 진행바를 통하여 100% 백분율에서 투표수만큼 진행바가 변경되도록 한다.
    // 투표를 하기 위해서는 회원가입이 필요하며 로그인을 하여야 한다.
    // 로그인을 하지 않은 상태에서는 투표를 할 수 없다.
    // 로그인을 하지 않은 상태에서는 글을 작성할 수 없다.
    // 코드 작성

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="App">
        <MainLayout />
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const hiddenPaths = ["/login", "/register", "/mypage", "/support"];

  return (
    <>
      <Nav /> {/* 네비게이션 바 */}
      {!hiddenPaths.includes(location.pathname) && <Boardlist />} {/* 게시판 목록 */}
      
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 변경 */}
        <Route path="/Hotboard" element={<Hotboard />} />
        <Route path="/VSboard" element={<VSBoard />} />
        <Route path="/participationboard" element={<Participationboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/oauth_kakao" element={<KakaoCallback />} />
        <Route path="/write" element={<Write />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryKey" element={<CategoryBoard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/mypage/point" element={<Point />} />
        <Route path="/vote/:id" element={<Vote title="ssssss" content="asdasdsad" options={["선택지1", "선택지2","adsfasdfas"]} />} />
        {/* 여기에서 vote/? 의 값에 따라서 API로 부터 JSON형식으로 데이터를 받아 데이터를 처리하는 로직을 작성해야함. */}
      </Routes>
      

      
    </>
  );
}




export default App;

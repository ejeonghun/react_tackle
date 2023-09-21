import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './Nav.css';
import LottieAnimation from '../Lottie/Lottie';

import Hamburger from '../Hambuger/Hamburger';  // 햄버거 메뉴 추가


function Boardlist() {
    return (
    <div className='boardlist'>
    <div className='search'>
    <input type='text' placeholder='검색어를 입력하세요' />
</div>
<div className="nav">
    
    <Link className="NavMenu" to="/Hotboard"><b>HOT 게시판</b></Link>
    <Link className="NavMenu" to="/VSboard"><b>찬반 게시판</b></Link>
    <Link className="NavMenu" to="/Freeboard"><b>자유 게시판</b></Link>
    
</div>
</div>
)}

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    } 

    return (
        <div>
        <div className="nav_bar">
            <Link className="MainIcon" to="/"><LottieAnimation /></Link>
                {/* 햄버거 메뉴 추가 */}
                <div className="hamburger_menu">
                    <Hamburger isOpen={isOpen} toggle={toggleMenu} />
                    { isOpen && (
                        // 여기에 메뉴 항목들을 추가하세요.
                        <ul>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/support">고객센터</Link></li>
                            <li><Link to="/mypage">마이페이지</Link></li>
                            <li><Link to="/register">회원가입</Link></li>
                        </ul>    
                    )}
                </div>  
        </div>



    </div>
    );
}

export {Boardlist};
export default Nav;
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, {useState, useContext, useEffect, useRef} from 'react';
import NonLoginProfileImage from '../img/tmp_profile_img.jpg'; // 프로필 이미지 추가
import './Nav.css';
// import LottieAnimation from '../Lottie/Lottie';
import AuthContext from '../AuthContext/AuthContext';
import Hamburger from '../Hambuger/Hamburger';  // 햄버거 메뉴 추가
import Search from '../Search/Search';

function Boardlist() {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 확인
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    return ( 
    <div className='boardlist'>
    <div className='search'>
      <input type="text" class="searchTerm" placeholder="검색어 입력" onChange={e => setSearchTerm(e.target.value)}/>
      <button type="submit" class="searchButton" onClick={() => navigate(`/search/${searchTerm}`)}>
        <img src='https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png'></img>
     </button>
    </div>
    <div className="nav">
        {/* 각 Link 컴포넌트에 대해 현재 위치와 매칭되면 borderBottom 스타일 적용 */}
                <Link 
                    className="NavMenu" 
                    to="/category/Hotboard"
                    style={{ borderBottom: location.pathname === "/category/Hotboard" ? "1px solid rgba(251, 3, 3, 1)" : "" }}
                >
                    <b>HOT 게시판</b>
                </Link>
                <Link 
                    className="NavMenu" 
                    to="/VSboard"
                    style={{ borderBottom: location.pathname === "/VSboard" ? "1px solid rgba(251, 3, 3, 1)" : "" }}
                >
                    <b>찬반 게시판</b>
                </Link>
                <Link 
                    className="NavMenu" 
                    to="/participationboard"
                    style={{ borderBottom: location.pathname === "/participationboard" ? "1px solid rgba(251, 3, 3, 1)" : "" }}
                 >
                     <b>참여 게시판</b>
                 </Link>   
    </div>
</div>
)}

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [key, setKey] = useState(0); // key state 추가
    const node = useRef(); // ref 생성
    const overlayRef = useRef(); // 추가: 어두운 배경 레퍼런스

    const { isLoggedIn, nickname, profileImage } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setKey(prevKey => prevKey + 1); // 메뉴가 토글될 때마다 key 값 증가
        // 어두운 배경 레퍼런스를 참조하여 투명도 조절

    } 

    const handleClickOutside = e => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click 
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 확인
    return (
        <div>
        <div className="nav_bar">
            {/* <LottieAnimation /> Lottie 사용 X*/}
            <Link className="MainIcon" to="/">
                {/* <img src="/img/Logo.png" alt="메인 아이콘" className='Logo' /> */}
                <img src="/img/Main.png" alt="메인 아이콘" className='Main_text' />
            </Link>
                {/* 햄버거 메뉴 추가 */}   
                <div className='hamburger_parent'>     
                <div ref={node} className="hamburger_menu" style={{ right: isOpen ? '0%' : '8%', top: isOpen ? '0%' : '23%',
                                                             width: isOpen ? '' : '', height: isOpen ? '100vh' : ''}}
                                                            key={key}>
                    <Hamburger isOpen={isOpen} toggle={toggleMenu} />
                    { isOpen && (
                        <ul>
                            {isLoggedIn ? (
                                 <>
                                    <li className = "profile">
                                    <img src={profileImage} alt="프로필 사진" /> {/* 프로필 이미지 추가 */}
                                    <span>{nickname}</span> {/* 닉네임 추가 */}
                                    </li>
                                    <li><Link to="/logout" onClick={() => setIsOpen(false)}>로그아웃</Link></li>

                                
                            </>
                        ) : (
                            <>{/* 비 로그인 시 출력되는 프로필 이미지 */}
                                    <li className="profile">
                                    <img src={require("../img/tmp_profile_img.jpg")} alt="프로필 사진" /> {/* 프로필 이미지 추가 */}
                                    <Link to="/login" onClick={() => setIsOpen(false)}><span className='non_login_span'>로그인하세요</span></Link> {/* 닉네임 추가 */}
                                    </li>
                        <li><Link to="/login" onClick={() => setIsOpen(false)}>로그인</Link></li>
                        </>)}
                            <li><Link to="/mypage" onClick={() => setIsOpen(false)}>마이페이지</Link></li>
                            <li><Link to="/category" onClick={() => setIsOpen(false)}>카테고리</Link></li>                    
                            <li><Link to="/support" onClick={() => setIsOpen(false)}>고객센터</Link></li>
                            </ul>     
                    )}
                </div>
                </div>
                <div className={`overlay ${isOpen ? 'overlay-visible' : ''}`} ref={overlayRef} style={{ opacity: isOpen ? 1 : 0 }}></div>
        </div>



    </div>
    );
}

export {Boardlist};
export default Nav;
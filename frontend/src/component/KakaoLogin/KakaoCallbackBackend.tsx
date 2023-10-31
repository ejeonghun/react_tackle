import { useEffect, useContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import AuthContext from '../AuthContext/AuthContext';

const KakaoCallbackBackend = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setNickname, setProfileImage } = useContext(AuthContext);

    useEffect(() => {
        // const origin = 'http://localhost:8083';
        const origin = `https://api1.lunaweb.dev`
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        
        axios.get(`${origin}/api/v1/auth/kakao/callback?code=${code}`)
        .then((res) => {
            const data = res.data;
            if(data.success) {
                const accessToken = data.data.accessToken; // JWT 토큰
                const KakaoId = data.userInfo.id; // 카카오에서 받은 id값 PK 값임!!
                const nicknameFromKakao = data.userInfo.nickname;  // 카카오 닉네임
                const profileImageFromKakao = data.userInfo.profile_image;  // 카카오 프로필 이미지

                // 백앤드에 id값을 보내서 DB에 저장하고, 로그인 처리를 해준다.
                setIsLoggedIn(true); // 로그인이 완료되면 AuthContext의 isLoggedIn 상태를 true로 변경합니다.
                setNickname(nicknameFromKakao); // 카카오에서 받은 닉네임으로 nickname 상태 업데이트
                setProfileImage(profileImageFromKakao); // 카카오에서 받은 프로필 이미지로 profileImage 상태 업데이트
                sessionStorage.setItem('accessToken', accessToken);   
                sessionStorage.setItem('nickname', nicknameFromKakao); // 세션 스토리지에 닉네임 저장
                sessionStorage.setItem('profileImage', profileImageFromKakao); // 세션 스토리지에 프로필 이미지 URL 저장
                sessionStorage.setItem('KakaoId',KakaoId);
                alert(`로그인 성공!`); 
                navigate('/');  
            } else {
                // 실패했을 경우 에러 처리
                console.error(data.message);
            }
        }, (error) => {
            console.log(error);
        });
    }, [navigate, setIsLoggedIn]); 
    
}

export default KakaoCallbackBackend;

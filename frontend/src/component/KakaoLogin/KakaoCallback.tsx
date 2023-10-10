import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import AuthContext from '../AuthContext/AuthContext';


const KakaoCallback = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.
    const { setIsLoggedIn } = useContext(AuthContext); // AuthContext에서 setIsLoggedIn 함수를 가져옵니다.
    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API}`;
        const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
        .then((res: any) => {
            console.log(res);
            const { access_token } = res.data;
            axios.post(
                `https://kapi.kakao.com/v2/user/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                }
            )
            .then((res: any) => {
                console.log('2번쨰', res);
                const id = res.data.id; // 카카오 OAuth ID 값 해당 값은 DB에 저장해두고 사용자를 구분하는 용도로 사용
                // 백앤드에 id값을 보내서 DB에 저장하고, 로그인 처리를 해준다.
                setIsLoggedIn(true); // 로그인이 완료되면 AuthContext의 isLoggedIn 상태를 true로 변경합니다.
                sessionStorage.setItem('id', id); // 세션에 id값 저장
                alert(`로그인 성공! ${id}`); // 배포시 주석처리
                navigate('/');  // 모든 작업이 완료되면 '/' 경로로 이동합니다.
                // id값 세션에 저장하기
                
            })
        })
        .catch((Error: any) => {
            console.log(Error)
        })
    }, [navigate])
    return (
        null
    );
}
export default KakaoCallback;
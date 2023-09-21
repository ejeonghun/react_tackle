const KakaoLogin = () => {
    const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    return(
        <img
            alt="카카오 로그인"
            src="https://ip.lunaweb.dev/image/kakao_login_medium_narrow.png"
            width="200px"
            height="auto"
            style={{margin: '10px 24px 16px 24px'}}
            onClick={() => window.location.href = kakaoURL}
        />
    )
}

export default KakaoLogin;
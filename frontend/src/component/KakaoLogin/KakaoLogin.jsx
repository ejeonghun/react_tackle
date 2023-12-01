const KakaoLogin = () => {
    const CLIENT_ID = `${process.env.REACT_APP_KAKAO_REST_API}`;
    // const REDIRECT_URI = `https://app.lunaweb.dev/auth/kakao/callback`
    const now_weburl = window.location.origin; // 현재 웹 주소를 가져옴 -> 테스트 서버, 실제 서버 구분
    const REDIRECT_URI = `${now_weburl}/auth/kakao/callback`

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    return(
        <img
            alt="카카오 로그인"
            src='/img/kakao_login_large_wide.png'
            width="300px"
            height="auto"
            onClick={() => window.location.href = kakaoURL}
        />
    )
}

export default KakaoLogin;
import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

function AdminPage() {
    const [data, setData] = useState([]); // 데이터를 저장할 상태
    const [Loading , setLoading] = useState(false); // 로딩 상태
    const idx = sessionStorage.getItem("KakaoId"); // 카카오 ID 가져오기
    const JWTToken = sessionStorage.getItem("accessToken"); // JWT 토큰 가져오기
    const Navigate = useNavigate();
    // 어드민이 아니면 메인페이지로 리다이렉션
    useEffect(() => {
        if(idx !== '3029582844' && idx !== '3052444812') {
            Navigate('/');
        }
    }, [idx, Navigate]);


    useEffect(() => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        async function getData() {
          // const response = await fetch('http://localhost:3000/sample.json'); 개발 시 사용
          const response = await axios.get('https://api1.lunaweb.dev/api/v1/board/list');
            setData(response.data); // 데이터가 로드되면 상태를 업데이트합니다.
            }
            
            getData();
            setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        }, []);
        
        // 게시글 삭제 버튼 클릭시 실행되는 function
        async function handleDelete(postId) {
            const response = await axios({ 
                method: 'delete',
                url: `https://api1.lunaweb.dev/api/v1/board/delete?postId=${postId}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWTToken}`
                }
            });
            alert(response.data.message);
            Navigate('/admin');
        }
        
          
          
        
    if (!data) return <div><Loading/></div>;     
    return (
        <div className="admin_main">
            {/* return 문안에서 idx값을 비교해 렌더링할 요소 선택 */}
        <div className="Admin_Top">
            <h2>관리자 페이지</h2>
            <p>idx 값으로 접속함</p>
        </div>
        <div className="Admin_Page_Container">
        <table className="myVoteTable">
          <thead>
            <tr>
              <th>PostId</th>
              <th>idx</th>
              <th>categoryId</th>
              <th>title</th>
              <th>content</th>
              <th>createdAt</th>
              <th>삭제</th>
            </tr>
          </thead>
        <tbody>
        {data.map((post) => (
            <tr key={post.postId}>
                <td>{post.postId}</td>
                <td>{post.idx}</td>
                <td>{post.categoryId}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td><button onClick={() => handleDelete(post.postId)}>게시글 삭제</button></td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
            </div>
    );
}

export default AdminPage;
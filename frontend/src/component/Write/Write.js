import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import AuthContext from '../AuthContext/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Upload_img from '../img/img_upload.png';
import './Write.css';





function Write() {
    const [selectCount, setSelectCount] = useState(2); // 초기 선택지는 2개
    const KakaoId = sessionStorage.getItem("KakaoId"); // 게시글 작성 기능을 위한 카카오 ID 가져오기
    const [categorySelect, setCategorySelect] = useState(""); // "카테고리"에 대한 선택된 값
    const [bettingAmountSelect, setBettingAmountSelect] = useState(""); // "베팅 금액"에 대한 선택된 값
    const [deadlineSelect, setDeadlineSelect] = useState(""); // "마감 기한"에 대한 선택된 값
    const [title, setTitle] = useState(""); // 제목에 대한 상태
    const [content, setContent] = useState(""); // 내용에 대한 상태
    const [selectOptions, setSelectOptions] = useState(["", ""]); // 초기 선택지 2개를 빈 문자열로 초기화
    const Navigate = useNavigate();
    const [image, setImage] = useState(''); // 이미지 URL을 저장할 state
    const [uploadStatus, setUploadStatus] = useState("end"); // 이미지 업로드 상태


    // API 부분
    // POST 값에 보낼 내용들에 state 대입
    const Post_Submit = (event) => {
        event.preventDefault(); // 새로고침 방지
    
        const requestData = {
            idx: KakaoId,
            categoryId: Number(categorySelect),
            title: title,
            content: content,
            status: "ING",
            bettingAmount: Number(bettingAmountSelect),
            votingDeadLine: deadlineSelect,
            voteItemsContent: selectOptions, // 선택지 내용
            votingImgUrl: image // 이미지 URL 추가
        };

    // 이미지 업로드가 완료되었는지 확인
    // 초기값은 end이고 만약 이미지 업로드 api를 호출하면 ing로 변경 추후 image가 state에 저장되면 end로 변경
    if (uploadStatus === "end") {
        // API 요청을 보내는 부분
        axios.post('https://api1.lunaweb.dev/api/v1/board/create', requestData)
        .then(response => {
            // API 요청이 성공했을 때의 처리
            console.log(response.data);
            alert("게시글 작성이 완료되었습니다.");
            Navigate('/'); // 게시글 작성 후 메인페이지로 리다이렉션
        })
        .catch(error => {
            // API 요청이 실패했을 때의 처리
            console.error(error);
            alert("글 작성에 실패했습니다. 다시 시도해주세요");
        });
        } else {
            // 이미지 업로드가 완료되지 않았으면 alert 띄우기
            alert("이미지 업로드 중입니다.");
        }
    };

    
    // 이미지 업로드 API 부분
    // 예외처리 필요 , localhost 환경에서 작동을 안함, 도메인에 올려서 사용해야함, 내부ip/test 에서는 작동
    const handleImageUpload = async (event) => {
        setUploadStatus("ing"); // 이미지 업로드 상태를 ing로 변경
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64Image = reader.result.split(',')[1];
          const formData = new FormData();
          formData.append('image', base64Image);
    
          try {
            // const response = await axios.post('https://api.imgur.com/3/image', formData, {
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
              headers: {
                'Authorization': 'Client-ID 1f3d2eb034dd021'
              }
            });
            
            setImage(response.data.data.link); // 업로드된 이미지의 URL을 state에 저장
            setUploadStatus("end"); // 이미지 업로드 상태 "완료"로 설정
            console.log(setImage);
          } catch (error) {
            console.error(error);
            setUploadStatus("fail"); // 이미지 업로드 상태 "실패"로 설정
          }
        };
      };

    // 이미지 업로드 API 부분 
    // Cloudflare Workers 프록시 서버 사용, 배포 시 주석 처리 및 위의 코드 주석 해제

    



    // 핸들러 부분 
    
    const addSelectOption = () => {
        if (selectOptions.length < 3) {
            setSelectOptions([...selectOptions, ""]);
        } else {
            alert("최대 3개까지 선택지를 추가할 수 있습니다.");
        }
    };
    
    const delSelectOption = () => {
        if (selectOptions.length > 2) {
            const updatedOptions = selectOptions.slice(0, selectOptions.length - 1);
            setSelectOptions(updatedOptions);
        } else {
            alert("최소 2개의 선택지가 필요합니다.");
        }
    };

    // 로그인 여부 확인후 안되어있으면 login 페이지로
    const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 확인

    if (isLoggedIn === false) {
        alert("로그인이 필요한 서비스입니다.");
        window.location.href = "/login";
    } else {
        // 로그인 상태일 때만 작성 페이지 보여줌
        // if문 else 시 /write 렌더링 시작
	return (
		<div className='Container'>
			    <form className='Form'>
                    <div className='DropdownContainer'>
					<select name="dropdown1" onChange={(e) => setCategorySelect(e.target.value)}>
                        {/* 선택값이 바뀔때마다 state에 value값 변경 */}
					 <option>카테고리</option>	
					 <option value="1">일상/연애</option>	
					 <option value="2">게임</option>	
					 <option value="3">스포츠</option>
                     <option value="4">사회/과학</option>	
                     <option value="5">정치/경제</option>	
                     <option value="6">문화/예술</option>	
				 </select>
                 <select name="dropdown2" onChange={(e) => setBettingAmountSelect(e.target.value)}>
                    {/* 선택값이 바뀔때마다 state에 value값 변경 */}
					  <option>베팅 금액</option>	
					  <option value="1000">1000P</option>	
					  <option value="5000">5000P</option>	
					  <option value="10000">10000P</option>	
				  </select>
				  <select name="dropdown3" onChange={(e) => setDeadlineSelect(e.target.value)}>
                    {/* 선택값이 바뀔때마다 state에 value값 변경 */}
					  <option>마감 기한</option>	
					  <option value="1">1일</option>	
					  <option value="2">2일</option>	
					  <option value="3">3일</option>	
                      <option value="4">4일</option>	
                      <option value="5">5일</option>	
                      <option value="6">6일</option>	
                      <option value="7">7일</option>	
				  </select>
                  </div>
				<label>
                    <br/>
					<input className="TitleInput" type="text" name="title" placeholder="제목" value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
                    {/* 내용이 바뀔때마다 state에 값을 넣어줌 */}
                    {/* 불필요한 랜더링이 발생할 수 있으므로 추 후 변경 요망 */}
				</label>
                
				<br/>
				<label>
					<textarea className="ContentTextarea" name="content" placeholder="내용을 입력하세요." value={content}
                    onChange={(e) => setContent(e.target.value)}/>
                    {/* 내용이 바뀔때마다 state에 값을 넣어줌 */}
				</label>
                
                <div className='SelectContainer'> {/* 선택지 부분 */}
                    {selectOptions.map((option, index) => (
                        <label key={index}>
                            <textarea
                                name={`select${index + 1}`}
                                placeholder={`선택지${index + 1}`}
                                value={option}
                                onChange={(e) => {
                                    const updatedOptions = [...selectOptions];
                                    updatedOptions[index] = e.target.value;
                                    setSelectOptions(updatedOptions);
                                }}
                            />
                        </label>
                    ))} 
                </div>
                <div className='SelectContainer'>
                    <div className='ButtonContainer'>
                        <button type="button" className="AddButton" onClick={addSelectOption}>➕</button>
                        <button type="button" className="DelButton" onClick={delSelectOption}>➖</button>
                    </div>
                    <label className="ImgLabel">
                    {/* <img src={Upload_img} alt='Upload' style={{width:'40px', height:'40px'}}/> */}
                    <input type='file' accept="image/*" onChange={handleImageUpload}/>
                    {/* <p style={{marginLeft:'10px'}}>📷</p> */}
                {image && <img src={image} alt='Uploaded' />}
                </label>
                </div> 
                <div className='Submitbutton'>
                <input type="submit" onClick={Post_Submit} value="작성" />
                </div>
			</form>
	    </div>	
     );
}}

export default Write;
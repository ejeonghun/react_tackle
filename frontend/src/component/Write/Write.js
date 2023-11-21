import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Upload_img from '../img/img_upload.png';
import ReactSelect from "react-select";
import './Write.css';
import styled from 'styled-components';

const Select = styled(ReactSelect)`
width: 100%;
margin-left: 2rem;
margin-right: 2rem;
font-size: 1.1rem;

@media (max-width: 820px) {
    font-size: 0.7rem;
    margin-left: 0.09rem;
    margin-right: 0.09rem;
}

.react-select__control {
    transition: all .3s;
}

.react-select__control:hover {
    border-color: blue;
}

.react-select__control--is-focused {
    border-color: blue;
    box-shadow: 0 0 3px blue;
}
`;
const Select2 = styled(ReactSelect)`
width: 22%;
margin-left: 0;
margin-right: 0;
font-size: 14px;

@media (max-width: 820px) {
    font-size: 0.7rem;
    margin-left: 0.09rem;
    margin-right: 0.09rem;
}

.react-select__control {
    transition: all .3s;
}

.react-select__control:hover {
    border-color: blue;
}

.react-select__control--is-focused {
    border-color: blue;
    box-shadow: 0 0 3px blue;
}
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 37px;
  height: 37px;
  animation: spin 2s linear infinite;
  margin: auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

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
    const [isAddOption, setIsAddOption] = useState(true);  // 추가 상태 변수

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
        console.log(requestData);
    // 이미지 업로드가 완료되었는지 확인
    // 초기값은 end이고 만약 이미지 업로드 api를 호출하면 ing로 변경 추후 image가 state에 저장되면 end로 변경
    if (uploadStatus === "end") {
        // API 요청을 보내는 부분
        axios.post('https://api1.lunaweb.dev/api/v1/board/create', requestData)
        .then(response => {
            // API 요청이 성공했을 때의 처리
            console.log(response.data);
            alert("게시글 작성이 완료되었습니다.");
            if(window.confirm("작성한 게시글을 확인하시겠습니까?")) {
                Navigate(`/Vote/${response.data.data}`)
            } else {
            Navigate('/'); // 게시글 작성 후 메인페이지로 리다이렉션
            }
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
    const toggleSelectOption = () => {
        if (isAddOption) {
            if (selectOptions.length < 3) {
                setSelectOptions([...selectOptions, ""]);
            } else {
                alert("최대 3개까지 선택지를 추가할 수 있습니다.");
            }
        } else {
            if (selectOptions.length > 2) {
                const updatedOptions = selectOptions.slice(0, selectOptions.length - 1);
                setSelectOptions(updatedOptions);
            } else {
                alert("최소 2개의 선택지가 필요합니다.");
            }
        }
        setIsAddOption(!isAddOption);  // 상태 반전
    };

    // 카테고리 데이터 정의
    const categoryOptions = [
        { value: "1", label: "일상/연애" },
        { value: "2", label: "게임" },
        { value: "3", label: "스포츠" },
        { value: "4", label: "사회/과학" },
        { value: "5", label: "정치/경제" },
        { value: "6", label: "문화/예술" },
    ];
    
    // 베팅 금액 데이터 정의
    const bettingAmountOptions = [
        { value: "1000", label: "1000P" },
        { value: "5000", label: "5000P" },
        { value: "10000", label: "10000P" },
    ];
    
    // 마감 기한 데이터 정의
    const deadlineOptions = [
        { value: "1", label: "1일" },
        { value: "2", label: "2일" },
        { value: "3", label: "3일" },
        { value: "4", label: "4일" },
        { value: "5", label: "5일" },
        { value: "6", label: "6일" },
        { value: "7", label: "7일" },
    ]; 


    // 로그인 여부 확인후 안되어있으면 login 페이지로
    const { isLoggedIn } = useContext(AuthContext); // 로그인 여부 확인

    // if (isLoggedIn === false) 
    if (1 === 1) {
    //     alert("로그인이 필요한 서비스입니다.");
    //     window.location.href = "/login";
    // } else {
        // 로그인 상태일 때만 작성 페이지 보여줌
        // if문 else 시 /write 렌더링 시작
	return (
		<div className='Container'>
			    <form className='Form'>
                    <div className='DropdownContainer'>
                    {/* <Select
                    options={categoryOptions}
                    placeholder="카테고리"
                    onChange={(option) => setCategorySelect(option.value)}
                    /> */}
                    <Select
                    options={bettingAmountOptions}
                    placeholder="베팅 금액"
                    onChange={(option) => setBettingAmountSelect(option.value)}
                    />
                    <Select
                    options={deadlineOptions}
                    placeholder="마감 기한"
                    onChange={(option) => setDeadlineSelect(option.value)}
                    />
                  </div>
                <div className='CategoryTitleContainer'>
                    <Select2
                    options={categoryOptions}
                    placeholder="카테고리"
                    onChange={(option) => setCategorySelect(option.value)}
                    />
                    <input
                        className="TitleInput"
                        type="text"
                        name="title"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
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
                                className={`select${index + 1}`}
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
                <div className='FunctionContainer'>
                    <div className='ButtonContainer'>
                        {/* <p style={{float:'right'}}>선택지 추가 / 삭제</p> */}
                        <button type="button" className="ToggleButton button-1" onClick={toggleSelectOption}>
                            {isAddOption ? '➕' : '➖'}
                        </button>
                    <label className="ImgLabel">
                    {uploadStatus === "ing" ? <Spinner /> : <img src={Upload_img} alt='Upload' style={{width:'20px', height:'20px'}}/>}
                    {uploadStatus === "ing" ? <p>업로드 중 ...</p> : <p>이미지 업로드</p>}
                    {uploadStatus === "ing" ? null : <input type='file' accept="image/*" onChange={handleImageUpload}/>}
                    {/* {uploadStatus === "ing" ? <Spinner /> : image && <img src={image} alt='Uploaded' />} */}
                </label>
                </div>
                <input type="submit" className='button-2' onClick={Post_Submit} value="작성" />
                </div>
			</form>
	    </div>	
     );
}}

export default Write;
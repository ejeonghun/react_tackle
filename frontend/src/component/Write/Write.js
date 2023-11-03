import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import AuthContext from '../AuthContext/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Upload_img from '../img/img_upload.png';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    background-color: white;
    padding : 50px;

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 75%;
`;

const Label = styled.label`
   font-size: 20px;
   font-weight: bold;
   margin-bottom : 10px; 
   text-align:center; // 왼쪽 정렬
   width : 100%; // 부모 요소(Form)의 전체 너비를 차지하도록 설정

`;

const Input = styled.input`
   width : 100%;
   padding: 10px 0px;
   border-radius : 5px; 
   border : solid 1px #dcdcdc; 
   font-weight: bold;

   &[type="submit"] {
       width: 100px;
       align-self: flex-end;
       margin-top: 5px;
       background-color : cyan; 
       color : black; 
       padding : .375rem .75rem; 
       border-radius : .25rem; 
       line-height : 1.5; 
       border-style : none
   }
`;
// 새로운 Select 스타일 컴포넌트
const Select = styled.select`
    width: 110px;  // 박스의 너비
    height: 30px;  // 박스의 높이
    padding: 3px;  // 텍스트와 박스 경계 사이의 간격
    border-radius: 5px;
    border: solid 1px #dcdcdc;
    font-size:14px; // 폰트 크기 조절


    &:focus {
       outline:none;
       box-shadow :0,0,0,.2rem rgba(0,123,255,.25); 
   }
`;
const DropdownContainer = styled.div`
	display:flex ; 
	flex-direction :row ;
	justify-content :space-between ; // 드롭다운 박스 사이의 공간을 균등하게 분배
	width :100% ; // 부모 요소(Form)의 전체 너비를 차지하도록 설정
	margin-bottom :20 px ; // 다음 요소와의 간격 설정
`;
const SelectContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Textarea = styled.textarea` // 제목,내용
	width: 100%;
	padding: 100px 0px;
	border-radius: 5px;
	border:solid 1px #dcdcdc;

`;
const TextareaSmall = styled.textarea` // 선택자
    width: 92%; // 더 작은 너비
    padding: 5px; // 더 작은 패딩
    border-radius: 5px;
    border:solid 1px #dcdcdc;

`;
const AddButton = styled.button`
    width: 100px;
    height: 30px;
    margin-top: 1px;
    background-color: black; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
`;

const DelButton = styled.button`
    width: 100px;
    height: 30px;
    margin-top: 1px;
    background-color: black; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
`;

const ImgLable = styled.label`
    all: unset;
    padding: 10px; /*padding를 주어 텍스트를 바탕으로 주변이 10px만큼 떨어지도록 설정*/
    text-align: center; /*버튼에서 텍스트가 가운데 있도록 설정*/
    background-color: #d5d5d5; /*배경 색을 설정(원하는 걸로 바꿔도 됨)*/
    color: black; /*글자 색*/
    font-weight: 500; /*폰트 사이즈를 500으로 바꿈*/
    cursor: pointer; 
    border-radius: 10px; /*버튼의 둥근 정도를 설정*/
    transition: opacity linear 0.1s;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

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
		<Container>
			    <Form>
                    <DropdownContainer>
					<Select name="dropdown1" onChange={(e) => setCategorySelect(e.target.value)}>
                        {/* 선택값이 바뀔때마다 state에 value값 변경 */}
					 <option>카테고리</option>	
					 <option value="1">일상/연애</option>	
					 <option value="2">게임</option>	
					 <option value="3">스포츠</option>
                     <option value="4">사회/과학</option>	
                     <option value="5">정치/경제</option>	
                     <option value="6">문화/예술</option>	

				 </Select>
                 <Select name="dropdown2" onChange={(e) => setBettingAmountSelect(e.target.value)}>
                    {/* 선택값이 바뀔때마다 state에 value값 변경 */}
					  <option>베팅 금액</option>	
					  <option value="1000">1000P</option>	
					  <option value="5000">5000P</option>	
					  <option value="10000">10000P</option>	
				  </Select>

				  <Select name="dropdown3" onChange={(e) => setDeadlineSelect(e.target.value)}>
                    {/* 선택값이 바뀔때마다 state에 value값 변경 */}
					  <option>마감 기한</option>	
					  <option value="1">1일</option>	
					  <option value="2">2일</option>	
					  <option value="3">3일</option>	
                      <option value="4">4일</option>	
                      <option value="5">5일</option>	
                      <option value="6">6일</option>	
                      <option value="7">7일</option>	

				  </Select>
                </DropdownContainer>
				<Label>
                    <br/>
					<Input type="text" name="title" placeholder="제목" value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
                    {/* 내용이 바뀔때마다 state에 값을 넣어줌 */}
                    {/* 불필요한 랜더링이 발생할 수 있으므로 추 후 변경 요망 */}
				</Label>
                
				<br/>
				<Label>
					<Textarea name="content" placeholder="내용을 입력하세요." value={content}
                    onChange={(e) => setContent(e.target.value)}/>
                    {/* 내용이 바뀔때마다 state에 값을 넣어줌 */}
				</Label>
                <ImgLable>
                    <img src={Upload_img} alt='Upload' style={{width:'40px', height:'40px'}}/>
                    <input type='file' accept="image/*" onChange={handleImageUpload} style={{display:'none'}}/>
                    <p style={{marginLeft:'10px'}}>이미지 업로드</p>
                {image && <img src={image} alt='Uploaded' />}
                </ImgLable>
                <SelectContainer> {/* 선택지 부분 */}
                    {selectOptions.map((option, index) => (
                        <Label key={index}>
                            <TextareaSmall
                                name={`select${index + 1}`}
                                placeholder={`선택지${index + 1}`}
                                value={option}
                                onChange={(e) => {
                                    const updatedOptions = [...selectOptions];
                                    updatedOptions[index] = e.target.value;
                                    setSelectOptions(updatedOptions);
                                }}
                            />
                        </Label>
                    ))} 
                </SelectContainer>
                <SelectContainer>
                <AddButton type="button" onClick={addSelectOption}>선택지 추가</AddButton>
                <DelButton type="button" onClick={delSelectOption}>선택지 삭제</DelButton>
                </SelectContainer>
                <Input type="submit" onClick={Post_Submit} value="작성" />
			</Form>
	    </Container>	
     );
}}

export default Write;
import React, { useContext} from 'react';
import styled from 'styled-components'
import AuthContext from '../AuthContext/AuthContext';

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
    width: 50%;
`;

const Label = styled.label`
   font-size: 20px;
   font-weight: bold;
   margin-bottom : 10px; 
   text-align:left; // 왼쪽 정렬
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
       margin-top: auto;
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
    width: 90%; // 더 작은 너비
    padding: 5px; // 더 작은 패딩
    border-radius: 5px;
    border:solid 1px #dcdcdc;

`;

function Write() {
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
					<Select name="dropdown1">
					 <option value="">카테고리</option>	
					 <option value="Option1">일상/연애</option>	
					 <option value="Option2">게임</option>	
					 <option value="Option3">스포츠</option>
                     <option value="Option4">사회/과학</option>	
                     <option value="Option5">정치/경제</option>	
                     <option value="Option6">문화/예술</option>	

				 </Select>

				  <Select name="dropdown2">
					  <option value="">베팅 금액</option>	
					  <option value="Option1">1000P</option>	
					  <option value="Option2">5000P</option>	
					  <option value="Option3">10000P</option>	
				  </Select>

				  <Select name="dropdown3">
					  <option value="">마감 기한</option>	
					  <option value="Option1">1일</option>	
					  <option value="Option2">7일</option>	
					  <option value="Option3">15일</option>	
                      <option value="Option4">30일</option>	

				  </Select>
                </DropdownContainer>
				<Label>
                    <br/>
					<Input type="text" name="title" placeholder="제목"/>
				</Label>
                
				<br/>
				<Label>
					<Textarea name="content" placeholder="내용을 입력하세요."/>
				</Label>

                <SelectContainer>
                <Label>
					<TextareaSmall name="select1" placeholder="선택지1"/>
				</Label>
                <Label>
					<TextareaSmall name="select2" placeholder="선택지2"/>
				</Label>
                </SelectContainer>

                <Input type="submit" value="작성" />

			</Form>
	    </Container>	
     );
}}

export default Write;
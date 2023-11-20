import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Vote.css';
import Loading from '../Loading/Loading';
import { getCategoryName } from '../Category/CategoryList.jsx';
import styled from 'styled-components';
import ReactSelect from "react-select";

const Select = styled(ReactSelect)`
width: 20vh;
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

// const [votes, setVotes] = useState(Array(options.length).fill(0)); // 각 선택지의 투표 수를 담는 배열
  function VotePage() {
    
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [votes, setVotes] = useState({});
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);
    const colors = ['red', 'blue', 'green', 'purple'];
    const KakaoId = sessionStorage.getItem("KakaoId"); // 투표 기능을 위한 카카오 ID 가져오기
    const [selectedValue, setSelectedValue] = useState(0); // 포인트 배팅을 위한 select value 값 가져오기
    const [SelectedValueText, setSelectedValueText] = useState(''); // 포인트 배팅을 위한 select value 값 가져오기
    const [options, setOptions] = useState([]); // 선택지 배열을 담는 state
    const [VotingStatus, setVotingStatus] = useState(false);
    const nickname = sessionStorage.getItem("nickname"); // 댓글 작성자 닉네임 가져오기
    const [boardImg, setBoardImg] = useState(''); // 게시글 이미지 가져오기
    const JWTToken = sessionStorage.getItem("accessToken"); // JWT 토큰 가져오기
    const [TotalVoteCount, setTotalVoteCount] = useState(0); // 총 투표 수 가져오기
    const [Category, setCategory] = useState(''); // 카테고리 state 지정
    const [PostVoteStatus, setPostVoteStatus] = useState(false); // 투표 기한? 'END':'ING' state 지정

      // 배팅 select 값이 변경될 때 호출되는 함수 기존 HTML Select 코드임
      // const handleSelectChange = (event) => {
      //   const selectedOption = event.target.value;
      //   if (selectedOption === '포인트 배팅') {
      //     setSelectedValue(selectedOption);
      //     setSelectedValueText('');
      //   } else {
      //   setSelectedValue(selectedOption);
      //   setSelectedValueText('Betting : '+ selectedOption + 'P');
      // }
      // };

      const handleSelectChange = (selectedOption) => {
        if (PostVoteStatus) { // 투표 상태가 진행 중인 경우만 선택 가능
          setSelectedValue(selectedOption.value);
          setSelectedValueText('Betting : '+ selectedOption.value + 'P');
        } else {
          alert("투표가 이미 마감되었습니다.");
        }
      };
      

    // API의 JSON 파일에 만약 이미지 요소가 있으면 화면상에 랜더링을 하고 없으면 하지 않는다.

      // https://api1.lunaweb.dev/api/v1/board/info 이 주소로 axios.post 요청을 보낸다.
      // 요청에 필요한 데이터는 postId와 id이다.
      // postId는 게시글의 고유 id이다.
      // id는 사용자의 고유 id이다.
      // useEffect에서 데이터를 받아와 state를 설정하는 부분
      useEffect(() => {
        // 게시글을 불러오는 API
        async function getData() {
          const response = await axios({ // POST 요청으로 처리한다.
            method: 'get',
            url: `https://api1.lunaweb.dev/api/v1/board/info?postId=${id}`,
            headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWTToken}`
          },
            
          });
          setPost(response.data.data); // 게시글 정보를 받아와서 state를 설정한다.
          const voteItemsContent = response.data.data.voteItemsContent; // 선택지 내용 배열을 가져온다.
          setPostVoteStatus(response.data.data.status === 'ING' ? true : false); // ing 이면 true , end 이면 false
          const voteItemIdMap = response.data.data.voteItemIdMap; // 선택지의 itemId와 득표수를 가져옵니다.
          const voteingStatus = response.data.data.voting; // 해당 유저의 투표 여부를 가져옵니다.
          if ((voteingStatus === true) || (PostVoteStatus === false)) { // 만약 투표를 했거나, 투표가 마감된 경우에는 선택지 결과값 출력
            const voteItems = Object.keys(voteItemIdMap).map((itemId, index) => ({
              content: voteItemsContent[index],
              itemId: itemId,
              voteCount: voteItemIdMap[itemId],
            }));
          setCategory(getCategoryName(response.data.data.categoryId));
            setOptions(voteItems);
            
          } else {
            const voteItems = Object.keys(voteItemIdMap).map((itemId, index) => ({ // 만약 투표를 하지 않았거나, 투표가 마감되지 않은 경우 총 투표수만 출력
              content: voteItemsContent[index],
              itemId: itemId,
              voteCount: 0 // 투표가 완료되지 않은 경우 투표 수를 0 으로 표시한다.
            }));
            setOptions(voteItems);
            
          }
          
          // 투표 여부와 관계없이 투표 카운트의 합계를 계산하여 상태를 갱신합니다.
          setTotalVoteCount(Object.values(voteItemIdMap).reduce((total, count) => total + count, 0));


          if (response.data.data.votingImgUrl != null) { // JSON 파일에 이미지가 있는 경우
            setBoardImg(response.data.data.votingImgUrl);
          }
          setVotingStatus(response.data.data.voting);
        }
        getData();
      
      // 댓글을 불러오는 API
        async function getComments() {
          const response = await axios.get(`https://api1.lunaweb.dev/api/v1/replies/info?postId=${id}`);
          setCommentsList(response.data);
        }
        getComments();
      }, [id, KakaoId]);
    

      // const totalVotes = options.reduce((total, option) => total + option.voteCount, 0); // 총 투표 수를 구하는 함수
      // const totalVotes = TotalVoteCount; // 총 투표 수를 구하는 함수

    // api에서 호출한 데이터중 data.voteItemIdMap 을 들고옵니다.
    // data.voteItemIdMap 은 선택지의 배열이고 ${itemId} 값 입니다.

    // 선택지의 배열을 options에 넣어줍니다.
    const handleVote = async (index) => {
      if (!KakaoId) {
        alert("로그인이 필요합니다."); // 카카오 로그인이 되어있지 않은 경우
        return; // DB에 vote_result 의 idx 값에 null이 들어가면 해당 게시물을 불러오는 info API가 오류가 발생합니다.
        // 이 점 유의
      } else if (!PostVoteStatus) { // 투표 상태가 마감된 경우
          alert("마감된 투표입니다.");
          return;
      }
      
      if (selectedValue === 0) { // 예외 처리
        alert("포인트를 배팅해주세요.");
        return;
      }

      if (!post) { <Loading/>}
      if (VotingStatus === false) {
        const confirmVote = window.confirm("투표하시겠습니까?");
        if (!confirmVote) return;
      
        const newOptions = [...options];
        newOptions[index].voteCount++;
        setOptions(newOptions);

      // 투표를 완료하면 API에 투표 결과를 전송하고, API를 재호출 하지 않고 화면상에 랜더링만 한다.
        const response = await axios.post('https://api1.lunaweb.dev/api/v1/board/voting', {
          "postId": post.postId,
          "idx": `${KakaoId}`, // 세션에서 사용자의 kakaoId를 가져와서 idx로 사용합니다.
          "itemId": parseInt(options[index].itemId),  // 선택한 항목의 인덱스를 itemId로 사용합니다.
          // "status": "ING",
          "bettingPoint": parseInt(selectedValue),// <select className='bet_select'> 의 value값을 가져와서 bettingPoint로 사용합니다. api에 쿼리를 보낼때 int형으로 보내야 합니다.
          // "getPoint": 0, // 실제 얻을 포인트로 변경해야 합니다.
          // "createdAt": new Date().toISOString()
        });
        
        if (response.data.message) { // 메세지가 있는 경우
          if (response.success === "true") { // 투표 성공
            alert("투표가 완료 되었습니다.");
            const response = await axios({ 
              method: 'post',
              url: `https://api1.lunaweb.dev/api/v1/board/info`,
              headers: { 'Content-Type': 'application/json' },
              data: { "postId": id, "id": KakaoId }
            });
            setPost(response.data.data);
            // 투표가 완료되면 다시 api 호출을 하여 리랜더링 한다.
          } else {
            alert(response.data.message); // api의 오류 코드를 alert로 띄웁니다.
          }
        }
      } else {
        alert("이미 투표를 완료하셨습니다.");
      }
    };
  
    

    // 댓글 입력 핸들러
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    // 댓글을 입력하면 API에 댓글을 전송하고, API를 재호출 하지 않고 화면상에 랜더링만 한다.
    // 댓글 제출 핸들러
    const handleCommentSubmit = async (event) => {
      event.preventDefault();
      if(comment.trim() !== "") {
        const response = await axios.post('https://api1.lunaweb.dev/api/v1/replies/create', {
          "idx": KakaoId, 
          "postId": id, 
          "comment": comment
        });
    
        if (response.data.success) {
          // 서버에서 새로 받은 댓글 목록으로 commentsList를 업데이트
          const commentsResponse = await axios.get(`https://api1.lunaweb.dev/api/v1/replies/info?postId=${id}`);
          setCommentsList(commentsResponse.data);
          // 댓글 입력란 초기화
          setComment("");
        } else {
          alert('댓글 작성에 실패했습니다.');
        }
      }
    };
    
    const bettingOptions = [
      { value: 0, label:`${PostVoteStatus ? '베팅 금액' :'투표 마감'}`},  // 만약 투표가 마감되면 disabled 처리가 되고 "투표 마감" 문구 출력
      { value: 1000, label: "1000P" },
      { value: 5000, label: "5000P" },
      { value: 10000, label: "10000P" }
  ];
                  


    if (!post) return <div><Loading/></div>;
  
  
    return (
      <div className="vote-container">

        <div className="title">
          <p>{Category}</p>
          <h1>{post.title}</h1>
          </div>
        <p className="content">{post.content}</p>
        {/* boardImg의 값이 null 아니라면 이미지를 표시한다. */}
        {boardImg && <img src={boardImg} alt="게시글 이미지" className="board-img" />}
        {boardImg && <br/>}
        <div className='bottom_info'>
        {/* <p className="v_nickname">작성자 : {post.idx}</p> */}
        <p className="v_nickname">작성자 : {post.nickname ? post.nickname : post.idx}</p> {/* 닉네임이 없는 경우 idx를 표시한다. */}
        <p className='totalVote'>총 <strong>{TotalVoteCount}</strong>표</p>
        <p className="bettingAmount">총 배팅금액 : <strong>{post.bettingAmount}P</strong></p>
        </div>
        {/* 총 베팅금액 추후 API 수정 시 수정 */}
        <h4 className='hr'>투표</h4>
        <div className='hr_bottom'></div>
        {options.map((option, index) => (
        <div key={index} className="option-container">
          <button style={{ backgroundColor: colors[index % colors.length] }} onClick={() => handleVote(index)} className='vote_button'>{option.content}</button>
          <div className="bar">
            <div 
              className={`bar-fill option${index + 1}`} // 선택지 애니메이션 삭제 시 해당 option 클래스 삭제 밑의 backgroundColor 주석 해제
              style={{ 
                width: `${TotalVoteCount > 0 ? (option.voteCount / TotalVoteCount) * 100 : 0}%`,
                // backgroundColor: colors[index % colors.length]
              }}
            />
          </div>
          <span>{option.voteCount} votes ({TotalVoteCount > 0 ? Math.round((option.voteCount / TotalVoteCount) * 100) : 0}%)</span>
        </div>
      ))}
      <hr/>
      {/* 포인트 배팅 */}
      <div className='point_bet'>
      {/*포인트 배팅은 1000P, 5000P, 10000P 으로 제한한다.*/}
      {/* <select className='bet_select' value={selectedValue} onChange={handleSelectChange}>
        <option value={0}>포인트 배팅</option>
        <option value={1000}>1000P</option>
        <option value={5000}>5000P</option>
        <option value={10000}>10000P</option>
      </select> */}
      <Select
        options={bettingOptions}
        placeholder={PostVoteStatus ? "베팅 금액" : "투표 마감"}
        value={bettingOptions.find(option => option.value === selectedValue)}
        onChange={handleSelectChange}
        isDisabled={!PostVoteStatus} // 투표 상태가 마감된 경우 선택을 비활성화
      />
      <p className='select_betting'>{SelectedValueText}</p>
      </div>
      <hr/>
      {/* 댓글 작성 폼 */}
      <div className='CommentWrite'>
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <textarea 
            value={comment} 
            onChange={handleCommentChange} 
            placeholder="댓글을 입력하세요..." 
            style={{ width: '80%', minHeight: '6px', resize: 'none', borderRadius: '4px', padding: '10px' }}
          />
          <button type="submit" style={{ border:'none', color:'white', background:'#007BFF', padding:'10px', cursor:'pointer', width:'15%' }}>작성</button>
        </form>
      </div>

      {/* 댓글 목록 */}
      {commentsList.length > 0 && (
      <>
        <h4>댓글 목록</h4>
        {commentsList.map((comment, index) => (
          comment && (
            <div style={{display:'flex'}} className='comment-item'>
              <p>{comment.idx} : </p>
              <p key={index}>{comment.comment}</p>
              <p className='comment_date'>{comment.createdMinutesAgo}</p>
            </div>
          )
        ))}
      </>
    )}

      
    </div>
);
  }

export default VotePage;

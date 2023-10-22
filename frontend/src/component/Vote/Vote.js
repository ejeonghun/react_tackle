import React, { useState } from 'react';
import './Vote.css';

function VotePage({ title, content, options }) {
  const [votes, setVotes] = useState(Array(options.length).fill(0));
  const colors = ['red', 'blue', 'green', 'purple']; // 선택지에 따른 색상 배열

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const totalVotes = votes.reduce((a,b) => a + b);

  return (
    <div className="vote-container">
      <h1 className="title">{title}</h1>
      <p className="content">{content}</p>
      <h4 className='hr'>투표</h4>
      <div className='hr_bottom'></div>
      {options.map((option, index) => (
        <div key={index} className="option-container">
          {/* 버튼과 bar-fill의 배경색을 동적으로 설정 */}
          <button style={{ backgroundColor: colors[index % colors.length] }} onClick={() => handleVote(index)}>{option}</button>
          <div className="bar">
            {/* votes[index] / totalVotes 비율에 따라 .bar-fill 의 넓이 조절 */}
            <div 
              className="bar-fill" 
              style={{ 
                width: `${totalVotes > 0 ? (votes[index] / totalVotes) * 100 : 0}%`,
                backgroundColor: colors[index % colors.length]
              }}
            />
          </div>
          {/* 각 선택지 별 투표 수 및 비율 출력 */}
          <span>{votes[index]} votes ({totalVotes > 0 ? Math.round((votes[index] / totalVotes) * 100) : 0}%)</span>
        </div>
      ))}
    </div>
);
}

export default VotePage;

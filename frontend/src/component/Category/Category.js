import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faSoccerBall } from '@fortawesome/free-solid-svg-icons';
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons';

const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); // 3개의 열 생성
    gap: 20px; // 그리드 아이템 사이에 간격 추가
    justify-content: space-between;
    flex-wrap: wrap; // 필요시 줄바꿈 처리
    padding-top:100px;
    justify-items: center;
`;

const CategoryCard = styled.div`
    width: 35%; // 3개의 카드가 한 줄에 나타나도록 설정하고 간격을 위한 여유분 확보
    margin-bottom: 30px; // 카드 사이의 수직 간격 설정

    display:flex;
    flex-direction : column;
    align-items:center;
`;

const IconContainer = styled.div`
    font-size: 50px;
`;

const CategoryName = styled.h2`
   text-align:center;
`;

function Categories() {
    const categories = [
        { name: '일상/연애', icon: faHeart, color:'red' },
        { name: '게임', icon: faGamepad, color:'cyan' },
        { name: '스포츠', icon :faSoccerBall, color:'green' },
        { name : '사회/과학', icon :faPeopleArrows, color:'orange'},
        { name : '정치/경제', icon :faLandmark, color:'purple'},
        { name :'문화/예술',icon :faMasksTheater, color:'brown'}
        
      ];

      return (
          <CategoryContainer>
              {
                  categories.map((category,index) => (
                      <CategoryCard key={index}>
                          <IconContainer>
                              <FontAwesomeIcon icon={category.icon} style={{color: category.color}}/>
                          </IconContainer>
                          <CategoryName>{category.name}</CategoryName>
                      </CategoryCard>
                  ))
              }
          </CategoryContainer>
      )
}

export default Categories;

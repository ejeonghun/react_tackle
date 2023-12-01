import React from "react";

// 카테고리 리스트
const categories = [
{ index:0, key: 'Hotboard', name: '인기글'},
{ index:1, key: 'daily-love', name: '일상/연애'},
{ index:2, key: 'game', name: '게임'},
{ index:3, key: 'sports', name: '스포츠'},
{ index:4, key : 'society-science', name : '사회/과학'},
{ index:5, key : 'politics-economy', name : '정치/경제'},
{ index:6, key :'culture-art',name :'문화/예술'}
];

// 리스트의 인덱스로 호출을 하면 해당하는 인덱스의 name을 반환
const getCategoryName = (categoryIndex) => {
const category = categories.find(c => c.index === categoryIndex);
return category ? category.name : 'Not found';
}


const getCategoryId = (categoryKey) => {
const category = categories.find(c => c.key === categoryKey);
return category ? category.index : 'Not found';
}

export {categories,getCategoryName,getCategoryId}
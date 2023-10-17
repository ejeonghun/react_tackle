import React from "react";
import Board from "../Board/Board.js";
import { useParams } from "react-router-dom";

function getCategoryName(categoryKey) {
    switch (categoryKey) {
        case 'daily-love':
            return '일상/연애';
        case 'game':
            return '게임';
        case 'sports':
            return '스포츠';
        case 'society-science':
            return '사회/과학';
        case 'politics-economy':
            return '정치/경제';
        case 'culture-art':
            return'문화/예술';
        default:
            return '';
    }
}

const CategoryBoard = () => {
    const URL = `${process.env.REACT_APP_URI}`;
    // URL에서 카테고리 KEY값을 가져온다.
    const { categoryKey } = useParams();
    const api = `${URL}/board/${categoryKey}`;
    const categoryName = getCategoryName(categoryKey);
    return (
        <Board BoardName={categoryName} />
    );
}

export default CategoryBoard;
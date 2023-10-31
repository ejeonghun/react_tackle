import React from 'react';
import './GiftShop.css';
import gifticon from './gifticon.png';
import gifticon2 from './gifticon2.png';
import gifticon3 from './gifticon3.png';
import gifticon4 from './gifticon4.png';
import gifticon5 from './gifticon5.png';
import gifticon6 from './gifticon6.png';



const gifticons = [
  gifticon,
  gifticon2,
  gifticon3,
  gifticon4,
  gifticon5,
  gifticon6
  //... 기프티콘 이미지 파일명을 추가하세요.
];

const GiftShop = () => (
<div>
    <h1>🛍️기프티샵🛍️</h1>
  <div className="gifticon-grid">
    {gifticons.map((gifticon, index) => (
      <img key={index} src={gifticon} className="gifticon-item" alt="gifticon" />
    ))}
  </div>
</div>   
);

export default GiftShop;

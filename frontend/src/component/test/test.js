import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState('');

  const handleImageUpload = async (event) => {
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
            'Authorization': 'Client-ID 1f3d2eb034dd021' // 여기에 imgur 클라이언트 ID를 입력하세요.
          }
        });

        setImage(response.data.data.link);
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <div>
      <input type='file' onChange={handleImageUpload} />
      {image && <img src={image} alt='Uploaded' />}
    </div>
  );
};

export default ImageUpload;

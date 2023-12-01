import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChargeSuccess = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
axios.post(`https://api1.lunaweb.dev/api/v1/payment/valid/`)
            .then((response) => {
                const { errorCode, errorMessage } = response.data;
                if (errorCode === 'DUPLICATE_IMP_UID') {
                    setMessage('중복된 impUid가 존재합니다.');
                } else {
                    setMessage('결제가 성공적으로 완료되었습니다.');
                }
            })
            .catch((error) => {
                setMessage('결제 처리 중 오류가 발생했습니다.');
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default ChargeSuccess;

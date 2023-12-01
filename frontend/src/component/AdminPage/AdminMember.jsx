import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminMemberTable.module.css';

function MemberTable() {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    async function fetchData() {
        if (sessionStorage.getItem("accessToken") === null) {
          alert("로그인이 필요합니다.");
          window.location.href = "/";
        }
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.get('https://api1.lunaweb.dev/api/v1/member/list', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setMembers(response.data);
    }
    fetchData();
  }, []);

  const handleCheckboxChange = (idx) => {
    if (selectedMembers.includes(idx)) {
      setSelectedMembers(selectedMembers.filter(id => id !== idx));
    } else {
      setSelectedMembers([...selectedMembers, idx]);
    }
  };

  const renderTableData = () => {
    return members.map((member, index) => (
      <tr key={index}>
        <td><input type="checkbox" checked={selectedMembers.includes(member.idx)} onChange={() => handleCheckboxChange(member.idx)} /></td>
        <td>{member.idx}</td>
        <td>{member.email}</td>
        <td>{member.nickname}</td>
        <td>{member.point}</td>
        <td>{new Date(member.regDt).toLocaleDateString()}</td>
      </tr>
    ));
  };

  return (
    <table className={styles.AdminMemberTable}>
      <thead>
        <tr>
          <th>선택</th>
          <th>Idx</th>
          <th>Email</th>
          <th>Nickname</th>
          <th>Point</th>
          <th>회원가입 날짜</th>
          {/* <th>Refresh Token</th>
          <th>Roles</th>
          <th>Status</th> */}
        </tr>
      </thead>
      <tbody>
        {renderTableData()}
      </tbody>
    </table>
  );
}

export default MemberTable;

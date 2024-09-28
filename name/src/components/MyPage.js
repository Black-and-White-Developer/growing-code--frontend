import React, { useState } from 'react';
import './MyPage.css';
import { Router } from 'react-router-dom';

function MyPage() {
  const [diaryText, setDiaryText] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // 수정할 항목의 인덱스를 저장
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 표시 여부
  const [userLevel, setUserLevel] = useState(''); // 사용자 수준 저장

  const handleSave = () => {
    if (diaryText.trim() === "") {
      alert("내용을 입력하세요.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString();
    const newEntry = { text: diaryText, date: formattedDate, num: diaryEntries.length+1};
    setDiaryEntries([newEntry, ...diaryEntries]);
    setDiaryText('');
  };

  const handleDelete = (index) => {
    const newEntries = diaryEntries.filter((_, i) => i !== index);
    setDiaryEntries(newEntries);
  };

  const handleEdit = (index) => {
    setEditIndex(index); // 수정할 항목의 인덱스를 설정
  };

  const handleEditChange = (index, newText) => {
    const updatedEntries = diaryEntries.map((entry, i) => 
      i === index ? { ...entry, text: newText } : entry
    );
    setDiaryEntries(updatedEntries);
  };

  const handleEditSave = () => {
    setEditIndex(-1); // 수정 모드 종료
  };

  const handleOpenOverlay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const handleLevelChange = (level) => {
    setUserLevel(level);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="leftSpace">
        <div className="profile-container">
          <img src="https://bocdn.ecotree.green/blog/0001/01/ad46dbb447cd0e9a6aeecd64cc2bd332b0cbcb79.jpeg?d=960x540" alt="Profile" className="profile-image" />
          
        </div>        
      </div>

      <div className="rightSpace">
        <h1>피드백 내용</h1>
        <div className="diary-input">
          <textarea 
            value={diaryText} 
            onChange={(e) => setDiaryText(e.target.value)} 
            placeholder="스스로에게 피드백을 남겨보세요" />
          <button onClick={handleSave}>
            저장
          </button>
        </div>
        <div>
          {diaryEntries.map((entry, index) => (
            <div className="entry" key={index}>
              <div className="entry-date">{entry.date} 성장 {entry.num}번</div>
              {editIndex === index ? (
                <>
                  <textarea 
                    value={entry.text}
                    onChange={(e) => handleEditChange(index, e.target.value)}/>
                  <button onClick={handleEditSave} >
                    수정 완료
                  </button>
                </>
              ) : (
                <>
                  <div className="entry-text">{entry.text}</div>
                  <div className="entry-buttons">
                    <button onClick={() => handleEdit(index)}>
                      <img src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png" alt="수정 아이콘" style={{ width: '12px', height: '12px' }} />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <img src="https://img.icons8.com/material-outlined/24/000000/trash.png" alt="삭제 아이콘" style={{ width: '12px', height: '12px' }} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;

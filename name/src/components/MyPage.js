import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { Router } from 'react-router-dom';

let lastUpdate='';
let today=new Date().toDateString();

function MyPage() {
  const [diaryText, setDiaryText] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // 수정할 항목의 인덱스를 저장
  const [plantStage, setPlantStage] = useState(1);

  useEffect(()=>{
    const fetchDiaries = async()=>{
        try{
            const response = await fetch("http://3.38.223.198:8080/mypage",{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU2MDY2MSwiZXhwIjoxNzI5MzYwNjYxfQ.YCkfhzDUYHuOq2Du2GTzIxakIhRxaeKriKZ2B_Gxp3Y'
                },
            });

            let data = await response.json();//data는 object타입
            const formattedEntries = Object.values(data).map((item, index) => ({
                content: item.content, // 실제 필드 이름에 맞춰서 변경
                date: item.date,       // 실제 필드 이름에 맞춰서 변경
                num: index + 1,       // 인덱스를 기반으로 번호 설정
            }));

            for(const newEntry in formattedEntries){
                setDiaryEntries([newEntry, ...diaryEntries]);
            }
        }
        catch(error){
            console.error(error);
        }
    };
    fetchDiaries();
  }, []);

  const handleSave = async () => {
    if (diaryText.trim() === "") {
        alert("내용을 입력하세요.");
        return;
    }
    const now = new Date();
    const formattedDate = now.toLocaleString();
    const newEntry = { content: diaryText, date: formattedDate, num: diaryEntries.length+1};

    if (lastUpdate !== today) {
      lastUpdate=today
      setPlantStage(plantStage + (1/8)); // 하루에 피드백 최대 1개(2개 이상 작성은 가능하나, 1개만 적용)=1/8씩 성장 //
    }
    
    try{
        const response = await fetch("http://3.38.223.198:8080/mypage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU2MDY2MSwiZXhwIjoxNzI5MzYwNjYxfQ.YCkfhzDUYHuOq2Du2GTzIxakIhRxaeKriKZ2B_Gxp3Y'
            },
            body: JSON.stringify(newEntry),
        });

        if (response.ok){
            setDiaryEntries([newEntry, ...diaryEntries]); //피드백 목록에 표시
        } else{
            console.error('피드백을 저장하지 못했습니다');
        }
    }catch (error){
        console.error('에러: ', error);
    }

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
        i === index ? { ...entry, content: newText } : entry
    );
    setDiaryEntries(updatedEntries);
    };

    const handleEditSave = () => {
    setEditIndex(-1); // 수정 모드 종료
    };

    return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="leftSpace">
        <div className="profile-container">
          <img src={`/plant/plant-stage-${parseInt(plantStage)}.png`} alt="Profile" className="profile-image" />          
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
                    value={entry.content}
                    onChange={(e) => handleEditChange(index, e.target.value)}/>
                    <button onClick={handleEditSave} >
                        수정 완료
                    </button>
                </>
                ) : (
                <>
                    <div className="entry-text">{entry.content}</div>
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

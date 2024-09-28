import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Comment.css';

const Comment = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [itemsList, setItemsList] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleCheckboxChange = (index) => {
        // 이미 선택된 체크박스를 다시 클릭하면 선택 해제
            if (selectedCheckbox === index) {
                setSelectedCheckbox(null);
            } else {
                setSelectedCheckbox(index);
            }
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content) {
            // 데이터 객체 생성
            const data = {
                title: title,
                content: content,
                checkbox: selectedCheckbox // 선택된 체크박스도 함께 보낼 수 있습니다
            };
    
            try {
                // fetch API를 사용해 POST 요청 보내기
                const response = await fetch('http://loacalhost:8080/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data) // data 객체를 JSON 형식으로 변환하여 보냄
                });
    
                if (response.ok) {
                    const result = await response.json(); // 서버에서의 응답을 JSON으로 파싱
                    console.log('서버 응답:', result);
    
                    // 제출된 항목을 리스트에 추가
                    setItemsList([...itemsList, { title, content }]);
    
                    // 폼 필드 초기화
                    setTitle('');
                    setContent('');
                } else {
                    console.error('서버에 데이터를 전송하는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('에러 발생:', error);
            }
        }
    };






    

    return (
        <form onSubmit={handleSubmit}>
            <div className='commentmain'>
                <p id='notice'>*주석을 추가할 단위를 선택해주세요</p>
                <div className='pickRange'>
                    <label className='cLabel'>
                        <input id='op1' type='checkbox' checked={selectedCheckbox === 1} onChange={() => handleCheckboxChange(1)}/>
                        <span class="checkmark"></span>
                        클래스 단위
                    </label>
                    <label className='cLabel'>
                        <input id='op2' type='checkbox' checked={selectedCheckbox === 2} onChange={() => handleCheckboxChange(2)}/>
                        <span class="checkmark"></span>
                        함수 단위
                    </label>
                    <label className='cLabel'>
                        <input id='op3' type='checkbox' checked={selectedCheckbox === 3} onChange={() => handleCheckboxChange(3)}/>
                        <span class="checkmark"></span>
                        줄 단위
                    </label>
                </div>



                
                <div className="codeContainer2">
                    <h2 id='cmH2'>코드 작성</h2>
                    <input id='codeConcept2'
                        type="text"
                        placeholder="코드 주제"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                    <textarea id='codeContent2'
                        placeholder="코드를 입력하세요"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                    <button type="submit" id='completeButton2'>작성완료</button>
                </div>
            </div>
        </form>
    );
};

export default Comment;
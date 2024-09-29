import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Comment.css';

const Comment = () => {
    // Base64 인코딩 함수
    const encodeToBase64 = (data) => {
        try {
            return btoa(encodeURIComponent(data)); // 유니코드 문자열을 안전하게 Base64로 인코딩
        } catch (err) {
            console.error("인코딩 오류: ", err);
            return null;
        }
    };

    const [title, setTitle] = useState('');
    const [code, setContent] = useState('');
    const [commentResult, setCommentResult] = useState(''); // 주석 결과를 위한 상태
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
        if (title && code) {
            // 데이터 객체 생성
            const data = {
                title: title,
                code: encodeToBase64(code),
                additionalType: selectedCheckbox // 선택된 체크박스도 함께 보낼 수 있습니다
            };

            const encodedData = JSON.stringify(data);

            try {
                // fetch API를 사용해 POST 요청 보내기
                const response = await fetch('http://3.38.223.198:8080/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU0NDQzMywiZXhwIjoxNzI5MzQ0NDMzfQ.nOfIauv_Dw6W6WHelJOW4pVyO1Nh8L2g83tIZdvPCYA'
                    },
                    body: encodedData // data 객체를 JSON 형식으로 변환하여 보냄
                });

                if (response.ok) {
                    const result = await response.json(); // 서버에서의 응답을 JSON으로 파싱
                    console.log('서버 응답:', result);

                     // 서버의 result 값을 state에 저장
                     setCommentResult(result.result); 

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
                        <input id='op1' type='checkbox' checked={selectedCheckbox === 1} onChange={() => handleCheckboxChange(1)} />
                        <span className="checkmark"></span>
                        클래스 단위
                    </label>
                    <label className='cLabel'>
                        <input id='op2' type='checkbox' checked={selectedCheckbox === 2} onChange={() => handleCheckboxChange(2)} />
                        <span className="checkmark"></span>
                        함수 단위
                    </label>
                    <label className='cLabel'>
                        <input id='op3' type='checkbox' checked={selectedCheckbox === 3} onChange={() => handleCheckboxChange(3)} />
                        <span className="checkmark"></span>
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
                        value={code}
                        onChange={handleContentChange}
                        required
                    />
                    <button type="submit" id='completeButton2'>작성완료</button>
                </div>
                <div>
                    <div id='result' className='getData1'>
                        <h3 id='comLabel'>RESULT: </h3>
                        <pre id='readCont'>
                            {commentResult && <div>결과: {commentResult}</div>} {/* 결과 표시 */}
                        </pre>
                    </div>
                    <div id='blank'>
                        
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Comment;
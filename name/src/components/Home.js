import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {


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
        const [itemsList, setItemsList] = useState([]);
        const [readabilityResult, setReadabilityResult] = useState(''); // readabilityResult 저장
        const [performanceResult, setPerformanceResult] = useState(''); // performanceResult 저장


        const handleTitleChange = (e) => {
            setTitle(e.target.value);
        };

        const handleContentChange = (e) => {
            setContent(e.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (title && code) {
                // 데이터 객체 생성
                const data = {
                    title: title,
                    code: encodeToBase64(code),
                    // checkbox: selectedCheckbox // 선택된 체크박스도 함께 보낼 수 있습니다
                };

                // 데이터를 Base64로 인코딩
                const encodedData = JSON.stringify(data); // 수정된 부분


                try {
                    // fetch API를 사용해 POST 요청 보내기
                    const response = await fetch('http://3.38.223.198:8080/feedback', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU0NDQzMywiZXhwIjoxNzI5MzQ0NDMzfQ.nOfIauv_Dw6W6WHelJOW4pVyO1Nh8L2g83tIZdvPCYA'
                        },
                        body: encodedData // data 객체를 JSON 형식으로 변환하고 인코딩하여 보냄
                    });

                    if (response.ok) {
                        const result = await response.json(); // 서버에서의 응답을 JSON으로 파싱
                        console.log('서버 응답:', result);

                        // 응답 결과를 상태에 저장
                        setReadabilityResult(result.readabilityResult);
                        setPerformanceResult(result.performanceResult);



                    // 제출된 항목을 리스트에 추가
                        setItemsList([...itemsList, { title, code }]);

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
            <div className='feedback'> 
                <nav className='FBoption'>
                    <a id='btn1' href='#noone'>
                        <label id='one'>가독성</label>
                    </a>
                    <a id='btn2' href='#notwo'>
                        <label id='two'>성 능</label>
                    </a>
                </nav>
                <div className="codeContainer2">
                <h2 id='fbH2'>코드 작성</h2>
                <form onSubmit={handleSubmit} id='codeInsertForm2'>
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
                </form>
                </div>
                <div className='res'>
                    <div id='noone' className='getData1'>
                        <h3 id='perfLabel'>Performance: </h3>
                        <div id='perfCont'>
                            <pre>{performanceResult}</pre>
                        </div>
                    </div>
                    <div id='notwo' className='getData2'>
                        <h3 id='readLabel'>Readability: </h3>
                        <div id='readCont'>
                            <pre>{readabilityResult}</pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    

};

export default Home;
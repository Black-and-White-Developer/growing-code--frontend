import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const [code, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => { //코드 입력->Gemini
    e.preventDefault();
    if (title && code) {
      try{
        const jsonData = JSON.stringify({ codeConcept: title, codeContent: code });
        const base64Data = btoa(jsonData); //base64로 변환

        const response = await fetch('http://3.38.223.198:8080/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU2MDY2MSwiZXhwIjoxNzI5MzYwNjYxfQ.YCkfhzDUYHuOq2Du2GTzIxakIhRxaeKriKZ2B_Gxp3Y'
          },
          body: JSON.stringify({data:base64Data}),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('성공적으로 전송됨:', data);
          setTitle('');
          setContent('');
        } else {
          console.error('전송 실패:', response.statusText);
        }
      }
      catch (error){
        console.error("오류 발생: ", error);
      }
    }
  };

  useEffect(() => { //Gemini->피드백 저장
    const fetchData = async () => {
      try {
        const response = await fetch('http://3.38.223.198:8080/feedback',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNzU2MDY2MSwiZXhwIjoxNzI5MzYwNjYxfQ.YCkfhzDUYHuOq2Du2GTzIxakIhRxaeKriKZ2B_Gxp3Y'
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log('데이터 가져오기 성공:', data);
        } else {
          console.error('데이터 가져오기 실패:', response.statusText);
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
/*
      const reviewData = JSON.stringify({ codeConcept: data.title, review: data.review });

      const response = await fetch('http://3.38.223.198:8080/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        body: JSON.stringify({data:btoa(reviewData)}), 
      })*/
    };

    fetchData();
  }, []);

  return (
    <div className="codeContainer">
      <h2>코드 작성</h2>
      <form onSubmit={handleSubmit} id='codeInsertForm'>
        <input id='codeConcept'
          type="text"
          placeholder="코드 주제"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <textarea id='codeContent'
          placeholder="코드를 입력하세요"
          value={code}
          onChange={handleContentChange}
          required
        />
        <button type="submit" id='completeButton'>작성완료</button>
      </form>
    </div>
  );
};

export default Home;
import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [itemsList, setItemsList] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      try{
        const jsonData = JSON.stringify({ codeConcept: title, codeContent: content });
        const base64Data = btoa(jsonData);

        const response = await fetch('http://localhost:8080/api/your-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({data:base64Data}),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('성공적으로 전송됨:', data);
          setItemsList([...itemsList, { title, content }]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/your-endpoint');
        if (response.ok) {
          const data = await response.json();
          console.log('데이터 가져오기 성공:', data);
          setItemsList(data); 
        } else {
          console.error('데이터 가져오기 실패:', response.statusText);
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
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
          value={content}
          onChange={handleContentChange}
          required
        />
        <button type="submit" id='completeButton'>작성완료</button>
      </form>
    </div>
  );
};

export default Home;
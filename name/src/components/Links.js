import { Link } from 'react-router-dom';
import './Links.css';
import React, { useState } from 'react';

const Links = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [itemsList, setItemsList] = useState([]);
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleContentChange = (e) => {
      setContent(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (title && content) {
        setItemsList([...itemsList, { title, content }]);
        setTitle('');
        setContent('');
      }
    };
  
    return (
      <div className="codeContainer">
        <h2>코드 작성</h2>
        <form onSubmit={handleSubmit} id='codeInsert form'>
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
  
  export default Links;
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            setItemsList([...itemsList, { title, content }]);
            setTitle('');
            setContent('');
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
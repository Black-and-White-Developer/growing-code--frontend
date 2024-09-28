import Menubar from './components/Menubar';
import Home from './components/Home';
import Comment from './components/Comment';
import Links from './components/Links';
import MyPage from "./components/MyPage";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation, useNavigate } from 'react-router-dom';


function AppLayout() {
  const location = useLocation(); // 현재 경로를 가져옴
  const navigate = useNavigate(); // useNavigate 훅 호출
  const handleLogoClick = () => {
    navigate("/"); // 루트 페이지로 이동
  };

  return (
    <div>
      <header className="appHeader">
        <p onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          logo
        </p>
        <MyPageButton />
      </header>

      {/* Menubar는 /mypage에서만 사라지도록 조건부 렌더링 */}
      {location.pathname !== "/mypage" && <Menubar />}

      <Outlet /> {/* 페이지 내용이 이곳에 바뀌면서 렌더링됨 */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/links" element={<Links />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

function MyPageButton() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/mypage"); 
  };

  return <button onClick={handleButtonClick}>마이페이지</button>;
}



export default App;






{/*
function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <p>logo</p>
        <Router>
          <MyPageButton />
        </Router>
      </header>
      <div>
        <Router>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/links" element={<Links />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

function MyPageButton() {
  const handleButtonClick = () => {
    window.location.href = "/mypage"; // 완전히 새로운 페이지로 이동
  };

  return <button onClick={handleButtonClick}>마이페이지</button>;
}






*/}
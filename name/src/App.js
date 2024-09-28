import Menubar from './components/Menubar';
import Home from './components/Home';
import Comment from './components/Comment';
import Links from './components/Links';
import MyPage from "./components/MyPage";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, useLocation, useNavigate } from 'react-router-dom';


function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div>
      <header className="appHeader">
        <p onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          logo
        </p>
        <MyPageButton />
      </header>

      
      {location.pathname !== "/mypage" && <Menubar />}

      <Outlet />
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




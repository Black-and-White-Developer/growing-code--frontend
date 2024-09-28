import Menubar from './components/Menubar';
import Home from './components/Home';
import Comment from './components/Comment';
import Links from './components/Links';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <p>logo</p>
        <button>마이페이지</button>
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

export default App;

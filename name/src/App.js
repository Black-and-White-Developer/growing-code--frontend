import Menubar from './components/Menubar';
import Home from './components/Home';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>logo</p>
        <button>마이페이지</button>
      </header>
      <div>
        <Router>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

        </Router>
      </div>
    </div>
  );
}

export default App;

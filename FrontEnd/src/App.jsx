import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Context from './context/Context';
import Register from './pages/Register';
import Login from './pages/Login';
import UserInterface from './pages/UserInterface';
import Search from './pages/Search';


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<UserInterface />} />
            <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
  );
}

export default App;

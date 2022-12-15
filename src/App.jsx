import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Blogpage from './Blogpage';
function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/:blogId' element={<Blogpage />}></Route>

      </Routes>
    </Router>
  )
}

export default App

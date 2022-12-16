import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Blog from './components/blog';

function Login() {
  //-------------------- States --------------------//
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null);
  const [loginSuccess, setLoginSuccess] = useState(JSON.parse(localStorage.getItem("loginSuccess")) || false);
  //-------------------- States --------------------//
  
  //-------------------- useEffects --------------------//
  useEffect(() => {
    localStorage.setItem("loginSuccess", JSON.stringify(loginSuccess));
    localStorage.setItem("token", JSON.stringify(token))
    
  }, [token])

  useEffect(() => {
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => setBlogs(data.posts));
    
  }, [loginSuccess])
  //-------------------- useEffects --------------------//

  //-------------------- functions --------------------//
  const logIn = () => {
    setLoginSuccess(true);
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      url: 'http://localhost:3000/api/login'
    }).then(data => setToken(data.data.token));
  }
  
  const logOut = () => {
    setLoginSuccess(null);
    localStorage.clear();
  }
  //-------------------- functions --------------------//
  
  const blogElements = blogs.map(blog => {
    return <Link to={`${blog._id}`}>
      <Blog
        body={blog.body}
        comments={blog.comments}
        isPublished={blog.isPublished}
        title={blog.title}
        key={blog._id}
        id={blog._id}
      >
      </Blog>
    </Link>
  })

  return (
    <div className="App">
      {!loginSuccess &&
        <div>
          <h1>Login</h1>
          <input type='text' name='username' placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          {!loginSuccess && <button onClick={logIn}>Log in</button>}
        </div>
      }
      {loginSuccess &&
        <div>
          <h1>Ibrablogs Admin Dashboard</h1>
          <button onClick={logOut}>Log out</button>
          <div>
            <input type='text' name='title' placeholder='Title' />
            <input type='text' name='body' placeholder='Body' />
            <button>Submit Post</button>
          </div>
          <div className="grid grid-center blog-container padding-lr-5 padding-tb-1">{blogElements}</div>
        </div>
      }
    </div>
  )
}

export default Login
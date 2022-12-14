import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Blog from './components/blog';

function Login() {
  //-------------------- States --------------------//
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null);
  const [loginSuccess, setLoginSuccess] = useState(JSON.parse(localStorage.getItem("loginSuccess")) || false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  //-------------------- States --------------------//
  
  //-------------------- useEffects --------------------//
  useEffect(() => {
    //run a check if token has expired
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      let currentDate = new Date();
      const decodedToken = jwt_decode(JSON.parse(localStorage.getItem("token")));
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        //If expiration dates comes, we set login state and token to null
        //This causes other useEffect to run, and sets our localStorage variables to null
        setLoginSuccess(null);
        setToken(null);
      }
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("loginSuccess", JSON.stringify(loginSuccess));
    localStorage.setItem("token", JSON.stringify(token))
    
  }, [token])

  useEffect(() => {
    axios({
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      url:'http://localhost:3000/posts'
    }).then(res => setBlogs(res.data.posts));
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

  const sendNewBlog = () => {
    axios({
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        title: title,
        description: description
      },
      url: "http://localhost:3000/posts"
    })
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
            <input type='text' name='title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <input type='text' name='description' placeholder='Body' onChange={(e) => setDescription(e.target.value)} />
            <button onClick={sendNewBlog}>Submit Post</button>
          </div>
          <div className="grid grid-center blog-container padding-lr-5 padding-tb-1">{blogElements}</div>
        </div>
      }
    </div>
  )
}

export default Login
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Homepage from './Homepage';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || null);
  const [loginSuccess, setLoginSuccess] = useState(JSON.parse(localStorage.getItem("loginSuccess")) || false);
  //Set up user login at App level
  //Once authenticated, render Homepage

  useEffect(() => {
    if (token) {
      setLoginSuccess(true);
    }

  }, [token])

  useEffect(() => {
    localStorage.setItem("loginSuccess", JSON.stringify(loginSuccess));
    localStorage.setItem("token", JSON.stringify(token))
  }, [loginSuccess])

  const logIn = () => {
    axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      url: 'http://localhost:3000/api/login'
    }).then(data => setToken(data.data.token));
  }

  return (
    <div className="App">
      {!loginSuccess && 
      <div>
        <h1>Login</h1>
        <input type='text' name='username' placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        {!loginSuccess && <button onClick={logIn}>Log in</button>}
      </div>
      }
      {loginSuccess &&
      <Homepage />
      }
      
    </div>
  )
}

export default Login
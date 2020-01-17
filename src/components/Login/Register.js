import React, { useState, useEffect } from "react";
import loginImg from "../../login.svg";
import axios from "axios";

const BASE_URI = 'http://27c96204.ngrok.io'

const Register = ({ containerRef }) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = (event) => {
    const body = {
      email: email,
      username: username,
      password: password
    }
  
    axios.post(`${BASE_URI}/auth/signUp`, body)
      .then(response => {
        if (response.data === '해당 Email이 이미 존재합니다!') {
          alert('해당 Email이 이미 존재합니다!');
          return;
        }
        alert('회원가입에 성공했습니다!');
        console.log(response);
        
      })
      .catch(err => {
        console.log(`ErrorCode: ${err}`);
        alert(`ErrorCode: ${err}`);
      });
  }

  return(
    <div className="base-container" ref={containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                name="email" 
                placeholder="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                name="username" 
                placeholder="username" 
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="text" 
                name="password" 
                placeholder="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={e => submitRegister(e)}>
            Register
          </button>
        </div>
      </div>
  )
}

export default Register;

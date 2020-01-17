import React, { useState, useEffect } from "react"
import  { Redirect } from 'react-router-dom'
import axios from "axios";
import loginImg from "../../login.svg";

const BASE_URI = 'http://27c96204.ngrok.io'
const AUTH_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvb2V1bnoiLCJVU0VSTkFNRSI6Im9vZXVueiIsIkVNQUlMIjoieXVuczk5NEBnbWFpbC5jb20iLCJVU0VSX1JPTEUiOiJST0xFX1VTRVIifQ.Ibvyggk8HMcgY-hiChQNb5TzOGcKH8KKAJAgx-Fto7s'

const Login = ({ containerRef }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (event) => {
    const body = {
      email: email,
      password: password
    }

    const config = {
      headers: {
        'Authorization': 'Bearer ' + AUTH_TOKEN
      }
    }
  
    axios.post(`${BASE_URI}/auth/formLogin`, body, config)
      .then(response => {
        if (!response.data) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }
        alert('로그인에 성공했습니다.');
        console.log(response.data.token);
        console.log(response);
        
        const uri = `/chat?username=ooeunz&email=${email}`
        return <Redirect to={uri} />
      })
      .catch(err => {
        console.log(`ErrorCode: ${err}`);
        alert(`ErrorCode: ${err}`);
      });
  }

  return (
    <div className="base-container" ref={containerRef}>
        <div className="header">Login</div>
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
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="password" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div class="fb-login-button" data-width="" data-size="medium" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={e => submitLogin(e)}>
              Login
            </button>  
        </div>
      </div>
  )
}

export default Login;
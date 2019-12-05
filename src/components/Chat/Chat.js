import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';

import InfoBar from '../InfoBar/InfoBar.js';
import Input from '../Input/Input.js';
import Messages from '../Messages/Messages.js';

import './Chat.scss';

const Chat = ({ location }) => {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const ENDPOINT = 'localhost:8080';


  // useEffect(() => {
  //   // cookie값을 받아서 넣기
  //   const userName = queryString.parse(location.search);

  //   setRoom(userName);

  //   // cookie 값 변화가 있을 때마다
  // }, [ENDPOINT, location.search]);

  // messages에 변화가 있을 때
  useEffect(() => {
    setMessages([...messages, message ]);
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    axiosFunc(message);
    
    console.log(message);
    console.log(response);    
  }

  const axiosFunc = (message) => {

    if (message) {
      axios.get(`${ENDPOINT}/dialogflow/detectIntent`, {
        params: {
          queryTxt: message
        }
      })
      .then(function (response) {
        let fulfillmentText = response.fulfillmentText;
        setResponse(response);
        console.log(response);  // 응답
      })
      .catch(function (error) {
      });    
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar userName={userName} />
        <Messages messages={messages} userName={setUserName} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat;
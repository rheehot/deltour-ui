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

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      axios.get(`${ENDPOINT}/dialogflow/detectIntent`, {
        params: {
          queryTxt: message
        }
      })
      .then(function (response) {
        console.log(response);  // 응답
      })
      .catch(function (error) {
      });    
    }
    console.log(message);
    console.log(response);    
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar userName={userName} />
        <Messages messages={messages} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat;
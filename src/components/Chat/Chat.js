import React, { useState, useEffect } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import dotenv from 'dotenv';

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.scss';
dotenv.config();

const BASE_URI = 'http://68df40b5.ngrok.io';
const AUTH_TOKEN =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJvb2V1bnoiLCJVU0VSTkFNRSI6Im9vZXVueiIsIkVNQUlMIjoieXVuczk5NEBnbWFpbC5jb20iLCJVU0VSX1JPTEUiOiJST0xFX1VTRVIifQ.Ibvyggk8HMcgY-hiChQNb5TzOGcKH8KKAJAgx-Fto7s';

const Chat = ({ location }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);

    const changeMessages = (messages, response) => [
        ...messages,
        response.data.data.msg,
    ];
    const changeMessage = () => '';

    useEffect(() => {
        const { username, email } = queryString.parse(location.search);

        setUsername(username);
        setEmail(email);
    }, location.search);

    const axiosRedirect = (body, config) => {
        axios
            .post(`${BASE_URI}/api/redirect`, body, config)
            .then((response) => {
                if (response.data.code === 200) {
                    setMessages((ms) => changeMessages(ms, response));
                }
            })
            .catch((err) => {
                console.log(`ErrorCode: ${err}`);
                alert(`ErrorCode: ${err}`);
            });
    };

    const axiosChatbot = (body, config) => {
        axios
            .post(`${BASE_URI}/api/detectIntent`, body, config)
            .then((response) => {
                setMessages((ms) => changeMessages(ms, response));
                setMessage((ms) => changeMessage());
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const sendMessage = (event) => {
        event.preventDefault();

        const body = { queryTxt: message };
        const config = { headers: { Authorization: 'Bearer ' + AUTH_TOKEN } };

        if (message) {
            axiosRedirect(body, config);
            axiosChatbot(body, config);
            setMessage('');
        }
        console.log(messages);
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar username={username} />
                <Messages
                    messages={messages}
                    username={username}
                    email={email}
                />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;

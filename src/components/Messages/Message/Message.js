import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { fulfillmentText, img, subFulfillmentText, author }, username, email }) => {
  let isSentByCurrentUser = false;

  if(author === email) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{username}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(fulfillmentText)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorWhite">{ReactEmoji.emojify(fulfillmentText)}</p>
              {
                img &&(<img className="messageText colorWhite" src={img} width="40%" />)
              }
              {
                subFulfillmentText && (<p className="messageText colorWhite">{ReactEmoji.emojify(subFulfillmentText)}</p>)
              }
            </div>
            <p className="sentText pl-10 ">{author}</p>
          </div>
        )
  );
}

export default Message;
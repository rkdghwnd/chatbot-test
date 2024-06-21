import React, { useState } from 'react';
import './MessageContainer.css';
import { Container } from '@mui/system';
import shortid from 'shortid';

const MessageContainer = ({ messageList, messageLoading }) => {
  const printedMessage = messageList.slice().reverse();

  return (
    <div className="message-container-wrapper custom-scroll">
      {printedMessage.map((message, index) => {
        return (
          <Container key={shortid.generate()} className="message-container">
            {message.host === 'system' ? (
              <div className="system-message-container">
                <p className="system-message">{message.data}</p>
              </div>
            ) : message.host === 'user' ? (
              <div className="my-message-container">
                <div className="my-message">{message.data}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/chairman.png"
                  className="chairman-image"
                  alt="profile"
                />
                <div className="your-message">{message.data}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;

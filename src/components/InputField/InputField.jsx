import React from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';
import './InputField.css';
import { IoSend } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';

const InputField = ({ message, setMessage, sendMessage, messageLoading }) => {
  return (
    <div className="input-area">
      <form onSubmit={sendMessage} className="input-container">
        <Input
          placeholder="Type in here…"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
          rows={1}
        />

        <Button
          disabled={message === '' || messageLoading}
          type="submit"
          className="send-button"
        >
          {messageLoading ? (
            <BsThreeDots className="message-send-icon" />
          ) : (
            <IoSend className="message-send-icon" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default InputField;

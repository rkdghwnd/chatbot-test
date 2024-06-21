import { useEffect, useState } from 'react';
import InputField from './components/InputField/InputField';
import MessageContainer from './components/MessageContainer/MessageContainer';
import { LuRefreshCw } from 'react-icons/lu';

import socket from './server';
import './App.css';

let receivedMessage = '';

function App() {
  const [message, setMessage] = useState('');
  const [messageLoading, setMessageLoading] = useState('');
  const [messageList, setMessageList] = useState([
    {
      ok: true,
      data: '반갑습니다! 칸웨이에 대해서 궁금하신것이 있으신가요?',
      host: 'chatbot',
    },
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessageLoading(true);

    // const inputStreamMessageData = [
    //   {
    //     ok: true,
    //     data: message,
    //     host: 'user',
    //   },
    //   { ok: true, data: '', host: 'chatbot' },
    // ];
    // setMessageList((prevState) => prevState.concat(inputStreamMessageData));

    const inputMessageData = [
      {
        ok: true,
        data: message,
        host: 'user',
      },
    ];
    setMessageList((prevState) => prevState.concat(inputMessageData));

    socket.emit('sendMessage', message, (res) => {
      console.log('sendMessage res', res);
      setMessageList((prevState) => prevState.concat(res));
    });

    setMessage('');
  };

  const resetMessage = () => {
    setMessageList([
      {
        ok: true,
        data: '반갑습니다! 칸웨이에 대해서 궁금하신것이 있으신가요?',
        host: 'chatbot',
      },
    ]);
  };

  useEffect(() => {
    // 스트리밍 데이터 수신 이벤트 처리
    socket.on('streamData', (data, cb) => {
      receivedMessage += data;
      console.log(receivedMessage);

      setMessageList((prev) => {
        const newPrev = prev.slice();
        const a = {
          ok: true,
          data: prev[prev.length - 1].data + data,
          host: '',
        };
        newPrev[prev.length - 1] = a;

        return newPrev;
      });
    });

    // 스트리밍 종료 이벤트 처리
    socket.on('streamEnd', () => {
      console.log('Stream ended');
      setMessageLoading(false);
      receivedMessage = '';
    });
  }, []);

  return (
    <div className="app-container">
      <div className="app">
        <header className="app-header">
          <div className="app-header-container">
            <img src="/chairman.png" />
            <h3>Khanway</h3>
            <button className="message-refresh-button" onClick={resetMessage}>
              <LuRefreshCw />
            </button>
          </div>
        </header>
        <MessageContainer
          messageList={messageList}
          messageLoading={messageLoading}
        />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          messageLoading={messageLoading}
        />
      </div>
    </div>
  );
}

export default App;

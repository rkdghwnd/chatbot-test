import { io } from 'socket.io-client';
const socket = io('https://a9aa-14-36-11-9.ngrok-free.app', {
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
}); // <-- 백엔드 주소와 연결된 소켓 생성
export default socket;

import { io } from 'socket.io-client';
const socket = io('https://ff62-14-36-11-9.ngrok-free.app'); // <-- 백엔드 주소와 연결된 소켓 생성
export default socket;

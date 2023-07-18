import io from 'socket.io-client';

const socket = io('http://localhost:8888', { transports: ['websocket'] });

socket.on('connect', () => {
    console.log('🔌 client connected');
});

socket.on('disconnect', () => {
    console.log('🔌 client disconnected');
});

export default socket;

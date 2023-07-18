import io from 'socket.io-client';
import { HOST } from '~/constants';

const socket = io(HOST, { transports: ['websocket'] });

socket.on('connect', () => {
    console.log('🔌 client connected');
});

socket.on('disconnect', () => {
    console.log('🔌 client disconnected');
});

export default socket;

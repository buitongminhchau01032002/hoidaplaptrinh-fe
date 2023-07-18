'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API, HOST, SOCKET_EVENT } from '~/constants';
import { userSelector } from '~/redux/selectors';
import { notisActions } from '~/redux/slices/notiSlice';
import io from 'socket.io-client';

let socket;

export default function NotiHandler() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('mounted');
        initSocket();
        initNotis();
        return () => {
            console.log('unmounted');
        };
    }, []);

    useEffect(() => {
        if (user) {
            // login
            socket.emit(SOCKET_EVENT.Authenticate, user?.token);
            socket.on(SOCKET_EVENT.Notify, (data) => {
                console.log(data);
            });
            console.log('login');
        } else {
            // logout
        }
    }, [user]);

    // socket
    function initSocket() {
        // singleton
        if (!socket) {
            // change server domain
            socket = io(HOST, { transports: ['websocket'] });
            socket.on('connect', () => {
                console.log('client connected');
            });

            socket.on('disconnect', () => {
                console.log('client disconnected');
            });
        }
    }

    function initNotis() {
        fetch(`${API}/notifications`, {
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
                dispatch(notisActions.setNoti(resJson.data));
            });
    }
    return null;
}

export { socket };

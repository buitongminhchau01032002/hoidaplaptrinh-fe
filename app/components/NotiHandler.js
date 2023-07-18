'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';
import { notisActions } from '~/redux/slices/notiSlice';

export default function NotiHandler() {
    const user = useSelector(userSelector);
    const dispath = useDispatch();
    useEffect(() => {
        console.log('mounted');
        initNotis();
        return () => {
            console.log('unmounted');
        };
    }, []);

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
                dispath(notisActions.setNoti(resJson.data));
            });
    }
    return null;
}

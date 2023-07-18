'use client';

import { useEffect } from 'react';

export default function NotiHandler() {
    useEffect(() => {
        console.log('mounted');
        return () => {
            console.log('unmounted');
        };
    }, []);
    return null;
}

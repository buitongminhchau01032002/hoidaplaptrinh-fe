'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function VerifyPage({ params }) {
    const router = useRouter();
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/auth/verification/' + params.verified_token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error_key) {
                    console.log(resBody);
                    toast.error(resBody?.message || 'Something went wrong');
                    return;
                }
                toast.success('Verify Successfully');
                router.push('/login');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            });
    }, []);
    return (
        <div className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow">
            <h2 className="mb-1 text-4xl font-semibold">Verifing your account...</h2>
            <p className="mb-4 text-gray-600">Relax and wait a second 🍉</p>
        </div>
    );
}

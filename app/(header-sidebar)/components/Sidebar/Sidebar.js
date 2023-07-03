'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API } from '~/constants';
import colorizeCategory from '~/utils/colorizeCategory';

export default function Sidebar() {
    const [topics, setTopics] = useState();
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        fetch(`${API}/topics`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    return;
                }
                setTopics(resJson.data);
            });
    }, []);
    function handleTopicFilter(topic) {
        const current = new URLSearchParams(Array.from(searchParams)); // -> has to use this form
        current.set('topic', topic?._id || 'all');
        const search = current.toString();
        const query = search ? `?${search}` : '';

        router.push(`${'/'}${query}`);
    }
    // console.log(searchParams);
    return (
        <div>
            <div className="mb-5">
                <p className="text-xl font-semibold">Topics</p>
                <div className="mt-3 rounded bg-white">
                    <div
                        onClick={() => handleTopicFilter(null)}
                        className={clsx('cursor-pointer border-b px-3 py-2 font-semibold', {
                            'text-primary':
                                !searchParams.get('topic') || searchParams.get('topic') === 'all',
                        })}
                    >
                        All topics
                    </div>
                    {topics?.map((topic) => (
                        <div
                            key={topic._id}
                            onClick={() => handleTopicFilter(topic)}
                            className={clsx('cursor-pointer border-b px-3 py-2 font-semibold', {
                                'text-primary': searchParams.get('topic') === topic._id,
                            })}
                        >
                            {topic?.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5">
                <p className="text-xl font-semibold">Popular tags</p>
                <div className="mt-3 flex flex-wrap">
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">
                        Frontend
                    </div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">
                        Backend
                    </div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">Job</div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">Bug</div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">
                        Javascript
                    </div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">Sql</div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">C++</div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">
                        Python
                    </div>
                    <div className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm">
                        HTML, CSS
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <p className="text-xl font-semibold">Trending</p>
                <div className="mt-3 space-y-3">
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80"
                                    />
                                </div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Minh Chau</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Administrator
                            </div>
                        </div>
                        <div className="py-1 font-bold">Làm sao để fomat code trong VS Code</div>
                        <div className="text-lgray-700 text-sm">
                            Chào mọi người! Hiện tài mình đang gặp vấn đề là không thể format code
                            trong VS code được. Một...
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://res.cloudinary.com/psncloud/image/upload/v1684654840/297441000.png"
                                    />
                                </div>
                                <p className="ml-2 text-sm font-bold text-gray-700">An Nguyen</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">
                            Tài liệu học Design Pattern ở đâu là đầy đủ nhất?
                        </div>
                        <div className="text-lgray-700 text-sm">
                            Mọi người cho em hỏi là một ứng dụng quản lý cần những Design Pattern
                            nào?
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="http://res.cloudinary.com/psncloud/image/upload/v1684641422/105511200.png"
                                    />
                                </div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Tran Tuan</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">
                            Cách kiểm tra 1 máy tính đã từng kết nối internet?
                        </div>
                        <div className="text-lgray-700 text-sm">
                            Công ty mình không cho phép sử dụng máy tính tại công ty để truy cập
                            internet và sắp tới mình được sếp giao nhiệm vụ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import VoteControl from '~/app/components/VoteControl';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';

export default function ManagePostPage() {
    const user = useSelector(userSelector);
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState([]);
    const [typePost, setTypePost] = useState('pending');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchTopic();
    }, []);

    function fetchTopic() {
        fetch(`${API}/topics?userId=${user?._id}`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
                setTopics(resJson.data);
            });
    }

    useEffect(() => {
        if (topics.length > 0) {
            setCurrentTopic(topics[0]._id);
        } else {
            setCurrentTopic(null);
        }
    }, [topics]);

    useEffect(() => {
        if (!currentTopic) {
            return;
        }
    }, [currentTopic, typePost]);

    function fetchPost() {}

    return (
        <div className="">
            {/* TOP BAR */}
            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                <select
                    onChange={(e) => setCurrentTopic(e.target.value)}
                    className="w-[200px] cursor-pointer rounded border px-3 py-1"
                >
                    {topics?.map((topic) => (
                        <option key={topic._id} value={topic._id}>
                            {topic.name}
                        </option>
                    ))}
                </select>

                <div className="flex font-medium">
                    <button
                        className={clsx('rounded px-3 py-1.5 text-primary', {
                            '!bg-primary !text-white': typePost === 'pending',
                        })}
                        onClick={() => setTypePost('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={clsx('rounded px-3 py-1.5 text-primary', {
                            '!bg-primary !text-white': typePost === 'denied',
                        })}
                        onClick={() => setTypePost('denied')}
                    >
                        Denied
                    </button>
                    <button
                        className={clsx('rounded px-3 py-1.5 text-primary', {
                            '!bg-primary !text-white': typePost === 'blocked',
                        })}
                        onClick={() => setTypePost('blocked')}
                    >
                        Blocked
                    </button>
                </div>
            </div>
            <div className="mt-4 space-y-4">
                <div className="flex rounded-lg bg-white">
                    {/* MAIN */}
                    <div className="flex-1 border-l border-r p-3">
                        {/* Top */}
                        <div className="flex items-center justify-between">
                            {/* User */}
                            <Link href={'profile/'} className="flex items-center">
                                <div className="flex items-center">
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover object-center"
                                            src="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Phuc Tran
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </Link>

                            {/* Date */}
                            <div className="text-sm text-gray-600">27/6/2023</div>
                        </div>

                        {/* Main */}
                        <Link href={'/'} className="mt-4 block">
                            <h2 className="text-lg font-bold">
                                Phương pháp tạo và quản lý API trong ứng dụng web
                            </h2>
                            <div className="mt-2 text-gray-600">
                                Chào mọi người, Mình muốn thảo luận về phương pháp tạo và quản lý
                                API trong ứng dụng web. Việc xây dựng một hệ thống API hiệu quả và
                                dễ dàng quản lý là rất quan trọng để đảm bảo sự linh hoạt và mở rộng
                                trong quá trình phát triển...
                            </div>
                            <div className="mt-3 flex items-center">
                                <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                    Discuss
                                </div>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    <div>• API</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="w-28 space-y-2 p-3">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Approve
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Deny
                        </button>
                    </div>
                </div>
                <div className="flex rounded-lg bg-white">
                    {/* MAIN */}
                    <div className="flex-1 border-l border-r p-3">
                        {/* Top */}
                        <div className="flex items-center justify-between">
                            {/* User */}
                            <Link href={'profile/'} className="flex items-center">
                                <div className="flex items-center">
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover object-center"
                                            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/avocados-title-c32b587.jpg"
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Tran Phuc
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </Link>

                            {/* Date */}
                            <div className="text-sm text-gray-600">26/6/2023</div>
                        </div>

                        {/* Main */}
                        <Link href={'/'} className="mt-4 block">
                            <h2 className="text-lg font-bold">
                                Tối ưu hóa tốc độ tải trang trong ứng dụng web
                            </h2>
                            <div className="mt-2 text-gray-600">
                                Xin chào cả nhà, Mình đang gặp phải vấn đề về tốc độ tải trang trong
                                ứng dụng web và muốn thảo luận với mọi người về các phương pháp tối
                                ưu hóa hiệu suất. Hiện tại, ứng dụng web của mình có thời gian tải
                                trang chậm và điều này ảnh...
                            </div>
                            <div className="mt-3 flex items-center">
                                <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                    Discuss
                                </div>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    <div>• Web</div>
                                    <div>• Optimize</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="w-28 space-y-2 p-3">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Approve
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Deny
                        </button>
                    </div>
                </div>
                <div className="flex rounded-lg bg-white">
                    {/* MAIN */}
                    <div className="flex-1 border-l border-r p-3">
                        {/* Top */}
                        <div className="flex items-center justify-between">
                            {/* User */}
                            <Link href={'profile/'} className="flex items-center">
                                <div className="flex items-center">
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover object-center"
                                            src="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Phuc Tran
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </Link>

                            {/* Date */}
                            <div className="text-sm text-gray-600">20/6/2023</div>
                        </div>

                        {/* Main */}
                        <Link href={'/'} className="mt-4 block">
                            <h2 className="text-lg font-bold">
                                Sử dụng Git và quy trình làm việc nhóm hiệu quả
                            </h2>
                            <div className="mt-2 text-gray-600">
                                Xin chào mọi người, Mình muốn thảo luận về việc sử dụng Git và quy
                                trình làm việc nhóm hiệu quả. Git đã trở thành một công cụ quan
                                trọng trong quản lý phiên bản và phát triển phần mềm, đồng thời quy
                                trình làm việc...
                            </div>
                            <div className="mt-3 flex items-center">
                                <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                    Discuss
                                </div>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    <div>• Git</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="w-28 space-y-2 p-3">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Approve
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Deny
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

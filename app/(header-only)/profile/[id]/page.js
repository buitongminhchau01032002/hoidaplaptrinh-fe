'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InforGroup from './components/InforGroup';
import { userSelector } from '~/redux/selectors';
import Avatar from './components/Avatar';
import { API } from '~/constants';
import clsx from 'clsx';
import VoteControl from '~/app/components/VoteControl';
import Link from 'next/link';

export default function Profile({ params }) {
    const currentUser = useSelector(userSelector);
    const [user, setUser] = useState(null);
    const { id } = params;
    useEffect(() => {
        if (!id) {
            return;
        }
        getUser();
    }, [id]);

    function getUser() {
        fetch(`${API}/users/` + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson.error_key);
                    setUser(null);
                    return;
                }
                setUser(resJson.data);
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
            });
    }

    function isOwner() {
        return user && currentUser?._id === user?._id;
    }

    return (
        <div>
            <h2 className="py-10 text-center text-2xl font-bold">PROFILE</h2>

            {/* AVATAR AND INFOR  */}
            <div className="mt-4 grid grid-cols-3 gap-7">
                {/* AVATAR */}
                <div className="col-span-1 flex flex-col items-center space-y-2">
                    <Avatar
                        user={user}
                        currentUser={currentUser}
                        onChange={getUser}
                        isOwner={isOwner()}
                    />
                    <div className="flex flex-col items-center">
                        <div className="">{user?.email}</div>
                        <div className="mt-3 rounded border bg-white px-3 font-semibold">
                            {user?.role}
                        </div>
                    </div>
                    {/* <FollowButton
                        user={user}
                        currentUser={currentUser}
                        onChange={getUser}
                        isOwner={isOwner()}
                    /> */}
                </div>

                {/* INFOR  */}
                <div className="col-span-2">
                    <InforGroup
                        user={user}
                        currentUser={currentUser}
                        onChange={getUser}
                        isOwner={isOwner()}
                    />
                </div>
            </div>

            {/* BOTTOM GROUP */}
            {/* <div className="mt-20 grid grid-cols-3 gap-7">
                <div className="col-span-2">
                    <Posts user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                </div>

                <div className="col-span-1">
                    <Following user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                </div>
            </div> */}

            <h2 className="py-10 text-center text-2xl font-bold">POST LIST</h2>
            <div className="grid grid-cols-3 gap-7">
                <div>
                    <div className="bg-white">
                        <div className={clsx('border-b p-3 font-semibold text-primary')}>
                            Posted posts
                        </div>
                        <div className={clsx('border-b p-3 font-semibold')}>Saved post</div>
                        <div className={clsx('border-b p-3 font-semibold')}>Pending post</div>
                    </div>
                </div>
                <div className="col-span-2 space-y-4">
                    {/* CARD */}
                    <div className="flex rounded-lg bg-white">
                        {/* LEFT */}
                        <div className="flex h-full w-16 flex-col items-center p-3">
                            {/* SCORE */}
                            <VoteControl upVotes={[1, 2, 3, 4]} downVotes={[]} />

                            {/* BOOKMARK */}
                            <button className="mt-3 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                    />
                                </svg>
                            </button>
                            <button className="mt-3 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </button>
                            <button className="mt-3 text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>

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
                                                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80"
                                            />
                                        </div>
                                        <p className="ml-2 text-sm font-bold text-gray-700">
                                            Minh Chau
                                        </p>
                                    </div>
                                    <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                        Administrator
                                    </div>
                                </Link>

                                {/* Date */}
                                <div className="text-sm text-gray-600">25/6/2023</div>
                            </div>

                            {/* Main */}
                            <Link href={'/'} className="mt-4 block">
                                <h2 className="text-lg font-bold">
                                    Làm sao để fomat code trong VS Code
                                </h2>
                                <div className="mt-2 text-gray-600">
                                    Chào mọi người! Hiện tài mình đang gặp vấn đề là không thể
                                    format code trong VS code được. Một số cách mình đã thử qua đó
                                    là: - Cài đặt lại vs code. - Thử khởi động lại máy. - Cài lại
                                    các extension format. - Tải bản Vs code cũ hơn ...
                                </div>
                                <div className="mt-3 flex items-center">
                                    <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                        Technology
                                    </div>
                                    <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                        <div>• Vs code</div>
                                        <div>• Format code</div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-24 space-y-2 p-3">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                    />
                                </svg>
                                <span className="ml-1">{3}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span className="ml-1">10</span>
                            </div>
                            <div className="text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-10 w-10"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* CARD */}
                    <div className="flex rounded-lg bg-white">
                        {/* LEFT */}
                        <div className="flex h-full w-16 flex-col items-center p-3">
                            {/* SCORE */}
                            <VoteControl upVotes={[1, 2, 3]} downVotes={[]} />

                            {/* BOOKMARK */}
                            <button className="mt-3 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                    />
                                </svg>
                            </button>
                            <button className="mt-3 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </button>
                            <button className="mt-3 text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>

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
                                                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80"
                                            />
                                        </div>
                                        <p className="ml-2 text-sm font-bold text-gray-700">
                                            Minh Chau
                                        </p>
                                    </div>
                                    <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                        Administrator
                                    </div>
                                </Link>

                                {/* Date */}
                                <div className="text-sm text-gray-600">10/6/2023</div>
                            </div>

                            {/* Main */}
                            <Link href={'/'} className="mt-4 block">
                                <h2 className="text-lg font-bold">
                                    Phân tích và xử lý lỗi trong ứng dụng Node.js
                                </h2>
                                <div className="mt-2 text-gray-600">
                                    Xin chào mọi người, Mình đang gặp phải một vấn đề liên quan đến
                                    phân tích và xử lý lỗi trong ứng dụng Node.js của mình và muốn
                                    nhờ sự thảo luận và chia sẻ kinh nghiệm từ các bạn. Trong quá
                                    trình phát triển ứng dụng Node.js, mình...
                                </div>
                                <div className="mt-3 flex items-center">
                                    <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                        Discuss
                                    </div>
                                    <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                        <div>• NodeJs</div>
                                        <div>• Backend</div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-24 space-y-2 p-3">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                    />
                                </svg>
                                <span className="ml-1">{4}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span className="ml-1">18</span>
                            </div>
                            {/* <div className="text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-10 w-10"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div> */}
                        </div>
                    </div>
                    {/* CARD */}
                    <div className="flex rounded-lg bg-white">
                        {/* LEFT */}
                        <div className="flex h-full w-16 flex-col items-center p-3">
                            {/* SCORE */}
                            <VoteControl upVotes={[1, 2, 3, 4, 5, 6]} downVotes={[]} />

                            {/* BOOKMARK */}
                            <button className="mt-3 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                    />
                                </svg>
                            </button>
                            <button className="mt-3 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </button>
                            <button className="mt-3 text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </div>

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
                                                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80"
                                            />
                                        </div>
                                        <p className="ml-2 text-sm font-bold text-gray-700">
                                            Minh Chau
                                        </p>
                                    </div>
                                    <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                        Administrator
                                    </div>
                                </Link>

                                {/* Date */}
                                <div className="text-sm text-gray-600">29/5/2023</div>
                            </div>

                            {/* Main */}
                            <Link href={'/'} className="mt-4 block">
                                <h2 className="text-lg font-bold">
                                    Tối ưu hóa hiệu suất trong ứng dụng ReactJS
                                </h2>
                                <div className="mt-2 text-gray-600">
                                    Chào mọi người, Tôi đang gặp một vấn đề liên quan đến hiệu suất
                                    trong ứng dụng ReactJS của mình và muốn thảo luận với các bạn về
                                    cách tối ưu hóa nó. Hiện tại, ứng dụng của tôi đã có kích thước
                                    lớn và gặp phải tình trạng chậm ...
                                </div>
                                <div className="mt-3 flex items-center">
                                    <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                        Discuss
                                    </div>
                                    <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                        <div>• ReactJS</div>
                                        <div>• Frontend</div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* RIGHT */}
                        <div className="w-24 space-y-2 p-3">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                    />
                                </svg>
                                <span className="ml-1">{5}</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <span className="ml-1">21</span>
                            </div>
                            <div className="text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-10 w-10"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

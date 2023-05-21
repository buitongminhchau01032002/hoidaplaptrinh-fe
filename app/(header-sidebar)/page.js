'use client';

import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/posts')
            .then((res) => res.json())
            .then((data) => {
                if (data.error_key) {
                    console.log(error);
                }
                setPosts(data.posts);
            });
    }, []);
    return (
        <div className="pt-5">
            {/* TOP BAR */}
            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                <div className="flex w-[200px] items-center justify-between rounded border px-3 py-1">
                    <span>Tất cả chủ đề</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="flex w-[200px] items-center justify-between rounded border px-3 py-1">
                    <span>Mới nhất</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            <div className="mt-4 space-y-4">
                {posts.map((post) => (
                    <div key={post?._id} className="flex rounded-lg bg-white">
                        {/* LEFT */}
                        <div className="flex h-full w-16 flex-col items-center p-3">
                            {/* SCORE */}
                            <div className="flex flex-col items-center">
                                <button className="-rotate-90 text-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </button>

                                <div className="text-lg font-semibold">0</div>

                                <button className="rotate-90 text-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                </button>
                            </div>

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
                        </div>

                        {/* MAIN */}
                        <div className="flex-1 border-l border-r p-3">
                            {/* Top */}
                            <div className="flex items-center justify-between">
                                {/* User */}
                                <Link
                                    href={'profile/' + post.author?._id}
                                    className="flex items-center"
                                >
                                    <div className="flex items-center">
                                        <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                            <img
                                                className="h-full w-full object-cover object-center"
                                                src={post?.author?.avatar}
                                            />
                                        </div>
                                        <p className="ml-2 text-sm font-bold text-gray-700">
                                            {post?.author?.first_name +
                                                ' ' +
                                                post?.author?.last_name}
                                        </p>
                                    </div>
                                    <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                        Member
                                    </div>
                                </Link>

                                {/* Date */}
                                <div className="text-sm text-gray-600">
                                    {moment(post.created_at).format('DD/MM/YYYY')}
                                </div>
                            </div>

                            {/* Main */}
                            <Link href={'/' + post._id} className="mt-4 block">
                                <h2 className="text-lg font-bold">{post.title}</h2>
                            </Link>
                            <div
                                className="mt-2 text-gray-600"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            ></div>
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
                                <span className="ml-1">0</span>
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

                                <span className="ml-1">0</span>
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
                ))}
            </div>
        </div>
    );
}

'use client';

import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostContentEditor from '~/app/components/PostContentEditor';
import VoteControl from '~/app/components/VoteControl';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';

export default function DetailPostPage({ params }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector(userSelector);
    useEffect(() => {
        getPost();
    }, []);

    function getPost() {
        fetch(`${API}/posts/` + params.postId)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    return;
                }
                setPost(resJson.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleDownVote(post) {
        fetch(`${API}/posts/${post._id}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
                getPost();
            });
    }
    function handleUpVote(post) {
        fetch(`${API}/posts/${post._id}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
                getPost();
            });
    }

    return (
        <div className="mt-5 rounded-lg bg-white">
            {loading && (
                <div className="flex justify-center py-6">
                    <svg
                        aria-hidden="true"
                        className="h-10 w-10 animate-spin fill-primary text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            )}
            {post && (
                <>
                    {user?.role === 'Administrator' && (
                        <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                            <div className=""></div>
                            <Link
                                href="/login"
                                className="mr-[85px] flex h-9 min-w-[120px] items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                            >
                                Block post
                            </Link>
                        </div>
                    )}

                    {/* POST */}
                    <div className="flex rounded-lg bg-white">
                        {/* LEFT */}
                        <div className="flex h-full w-16 flex-col items-center p-3">
                            {/* SCORE */}
                            <VoteControl
                                upVotes={post?.up_votes}
                                downVotes={post?.down_votes}
                                onDown={() => handleDownVote(post)}
                                onUp={() => handleUpVote(post)}
                            />

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
                            {user?._id === post?.author?._id && (
                                <>
                                    {/* EDIT */}
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
                                    {/* DELETE */}
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
                                </>
                            )}
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
                                        {post?.author?.role}
                                    </div>
                                </Link>

                                {/* Date */}
                                <div className="text-sm text-gray-600">
                                    {moment(post?.created_at).format('DD/MM/YYYY')}
                                </div>
                            </div>

                            {/* Main */}
                            <div className="mt-4 block">
                                <h2 className="text-xl font-bold">{post?.title}</h2>
                                <div className="text-editor mt-2 text-gray-800">
                                    <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
                                    <div className="mt-2 space-y-2">
                                        {post?.images?.map((image, index) => (
                                            <img key={index} className="block" src={image} />
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center">
                                    <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                        {post?.topic?.name}
                                    </div>
                                    <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                        {post?.tags?.map((tag) => (
                                            <div key={tag._id}>• {tag?.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
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
                                <span className="ml-1">{post?.comment_count}</span>
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

                                <span className="ml-1">{post?.view_count}</span>
                            </div>

                            {
                                // TODO: get from API
                                false && (
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
                                )
                            }
                        </div>
                    </div>
                </>
            )}

            {/* COMMENT */}
            <p className="mt-5 px-3 text-lg font-bold">Comments</p>
            <div className="px-3 py-2">
                <div className="space-x-2 border-b pb-3">
                    <PostContentEditor setFormik={() => {}} />
                </div>

                {/* LIST COMMENT */}
                <div className="pt-3">
                    {/* COMMENT */}
                    <div className="flex px-2 py-3">
                        {/* SCORE */}
                        <div className="flex w-[52px] flex-col items-center border-r pr-3">
                            <button className="-rotate-90 text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </button>

                            <div className="font-semibold">5</div>

                            <button className="rotate-90 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </button>
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
                        <div className="flex-1 space-y-2 pl-3">
                            <div className="flex items-center justify-between">
                                {/* User */}
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <div className="h-7 w-7 rounded-full bg-red-500"></div>
                                        <p className="ml-2 text-sm font-bold text-gray-700">
                                            Hoang Anh
                                        </p>
                                    </div>
                                    <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                        Member
                                    </div>
                                    {/* Date */}
                                    <div className="ml-2 text-sm text-gray-600">• 27/6/2023</div>
                                </div>
                            </div>
                            {/* Content */}
                            <div>
                                Bạn thử dùng Prettier xem. Cài extension rồi cấu hình format cho
                                ngôn ngữ. Vào setting.json chỉnh phần "format-language" thành
                                "prettier".
                            </div>
                            <button className="flex items-center space-x-2 rounded border px-2 py-0.5 hover:border-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                    />
                                </svg>
                                <p className="text-sm">Reply</p>
                            </button>
                        </div>
                    </div>

                    {/* REPLY */}
                    <div className="flex px-2 py-3">
                        {/* SCORE */}
                        <div className="flex w-[100px] flex-col items-center border-r pr-3"></div>
                        <div className="flex-1 space-y-2 pl-3">
                            <div className="flex items-center justify-between">
                                {/* User */}
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <div className="h-7 w-7 overflow-hidden rounded-full bg-violet-500">
                                            <img
                                                className="h-full w-full object-cover"
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
                                    {/* Date */}
                                    <div className="ml-2 text-sm text-gray-600">• 27/6/2023</div>
                                </div>
                                <div className="flex">
                                    <button className="text-gray-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                            />
                                        </svg>
                                    </button>
                                    <button className="ml-2 text-red-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Content */}
                            <div>Cách này được rồi. Cảm ơn bạn!</div>
                        </div>
                    </div>

                    {/* COMMENT */}
                    <div className="flex px-2 py-3">
                        {/* SCORE */}
                        <div className="flex w-[52px] flex-col items-center border-r pr-3">
                            <button className="-rotate-90 text-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </button>

                            <div className="font-semibold">-1</div>

                            <button className="rotate-90 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </button>
                            <div className="mt-3 text-gray-600">
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
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex-1 space-y-2 pl-3">
                            <div className="flex items-center justify-between">
                                {/* User */}
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <div className="h-7 w-7 overflow-hidden rounded-full bg-violet-500">
                                            <img
                                                className="h-full w-full object-cover"
                                                src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ5pAUkFjASncLgVEsqVbwyTj0LP1ObO85jakWZEibYYmjHzzQux9-C1zQ2DXiZnAldF_l5_EXyZXQqQf4"
                                            />
                                        </div>
                                        <p className="ml-2 text-sm font-bold text-gray-700">
                                            Anh Phan
                                        </p>
                                    </div>
                                    <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                        Member
                                    </div>
                                    {/* Date */}
                                    <div className="ml-2 text-sm text-gray-600">• 25/6/2023</div>
                                </div>
                            </div>
                            {/* Content */}
                            <div>Có thể do máy của bạn không hỗ trợ format code đó.</div>
                            <button className="flex items-center space-x-2 rounded border px-2 py-0.5 hover:border-primary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                                    />
                                </svg>
                                <p className="text-sm">Reply</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

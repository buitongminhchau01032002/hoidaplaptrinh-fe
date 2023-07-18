'use client';

import clsx from 'clsx';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import striptags from 'striptags';
import VoteControl from '~/app/components/VoteControl';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';

export default function ManagePostPage() {
    const user = useSelector(userSelector);
    const [topics, setTopics] = useState([]);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [typePost, setTypePost] = useState('pending');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

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
        fetchPost();
    }, [currentTopic, typePost]);

    function fetchPost() {
        setLoading(true);
        fetch(`${API}/posts/${typePost}?topicId=${currentTopic}`, {
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
                setPosts(resJson.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleApprove(postId) {
        fetch(`${API}/posts/${postId}/approve`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    toast.error('Something went wrong!');
                    return;
                }
                toast.success('Approve successfully!');
                fetchPost();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong!');
            });
    }

    function handleDeny(postId) {
        fetch(`${API}/posts/${postId}/deny`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    toast.error('Something went wrong!');
                    return;
                }
                toast.success('Deny successfully!');
                fetchPost();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong!');
            });
    }
    function handleUnblock(postId) {
        fetch(`${API}/posts/${postId}/unblock`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    toast.error('Something went wrong!');
                    return;
                }
                toast.success('Unblock successfully!');
                fetchPost();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong!');
            });
    }

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
                {!loading &&
                    posts?.map((post) => (
                        <div key={post._id} className="flex rounded-lg bg-white">
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
                                                    '' +
                                                    post?.author?.last_name}
                                            </p>
                                        </div>
                                        <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                            {post?.author?.role}
                                        </div>
                                    </Link>

                                    {/* Date */}
                                    <div className="text-sm text-gray-600">
                                        {moment(post?.created_at).format('HH:MM DD.MM.YYYY')}
                                    </div>
                                </div>

                                {/* Main */}
                                <Link href={'/' + post._id} className="mt-4 block">
                                    <h2 className="text-lg font-bold">{post?.title}</h2>
                                    <div
                                        className="mt-2 h-[70px] overflow-y-hidden text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: striptags(post?.content, '<br>', '<p>'),
                                        }}
                                    >
                                        {/* <LinesEllipsis
                                                text={}
                                                maxLine="3"
                                                ellipsis="..."
                                                trimRight
                                                basedOn="letters"
                                            /> */}
                                    </div>
                                    <div className="mt-3 flex items-center">
                                        <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                            {post?.topic?.name}
                                        </div>
                                        <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                            {post?.tags?.map((tag) => (
                                                <div key={tag._id}>{`• ${tag.name}`}</div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* RIGHT */}
                            <div className="w-28 space-y-2 p-3">
                                {(typePost === 'pending' || typePost === 'denied') && (
                                    <button
                                        className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                                        onClick={() => handleApprove(post._id)}
                                    >
                                        Approve
                                    </button>
                                )}
                                {typePost === 'pending' && (
                                    <button
                                        className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-red-600"
                                        onClick={() => handleDeny(post._id)}
                                    >
                                        Deny
                                    </button>
                                )}
                                {typePost === 'blocked' && (
                                    <button
                                        className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                                        onClick={() => handleUnblock(post._id)}
                                    >
                                        Unblock
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                {!loading && posts?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-10 w-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                        </svg>

                        <p className="mt-2">There is no post</p>
                    </div>
                )}
            </div>
        </div>
    );
}

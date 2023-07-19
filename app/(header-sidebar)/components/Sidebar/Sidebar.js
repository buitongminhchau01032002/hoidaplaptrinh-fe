'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { toast } from 'react-toastify';
import striptags from 'striptags';
import { API } from '~/constants';
import colorizeCategory from '~/utils/colorizeCategory';

export default function Sidebar() {
    const [topics, setTopics] = useState([]);
    const tags = [
        'thông báo',
        'c++',
        'algorithm',
        'javascript',
        'html',
        'oop',
        'thảo luận',
        'công việc',
        'học tập',
        'tiếng anh',
    ];
    const [trendingPosts, setTrendingPosts] = useState([]);
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
        fetch(`${API}/posts/trending`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    return;
                }
                setTrendingPosts(resJson.data);
            });
    }, []);
    function handleTopicFilter(topic) {
        const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
        current.set('topic', topic?._id || 'all');
        const search = current.toString();
        const query = search ? `?${search}` : '';

        router.push(`${'/'}${query}`);
    }

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
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: colorizeCategory({
                                    created_at: (tag.length % 6) * 10,
                                }),
                            }}
                            className="mb-1 mr-1 rounded border bg-white px-2 py-1 text-sm"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5">
                <p className="text-xl font-semibold">Trending</p>
                <div className="mt-3 space-y-3">
                    {trendingPosts?.map((post) => (
                        <div key={post._id} className="rounded-lg bg-white p-3">
                            <div className="flex items-center">
                                <Link
                                    href={'profile/' + post?.author?._id}
                                    className="flex items-center"
                                >
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={post?.author?.avatar}
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        {post?.author?.first_name + ' ' + post?.author?.last_name}
                                    </p>
                                </Link>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    {post?.author?.role}
                                </div>
                            </div>
                            <Link href={'/' + post._id}>
                                <div className="py-1 font-bold">
                                    <LinesEllipsis
                                        text={post?.title}
                                        maxLine="1"
                                        ellipsis="..."
                                        trimRight
                                        basedOn="letters"
                                    />
                                </div>
                                <div className="text-lgray-700 text-sm">
                                    <LinesEllipsis
                                        text={striptags(post?.content)}
                                        maxLine="2"
                                        ellipsis="..."
                                        trimRight
                                        basedOn="letters"
                                    />
                                </div>
                            </Link>
                            <div className="mt-3 flex items-center">
                                <button
                                    onClick={() => handleTopicFilter(post?.topic)}
                                    className="rounded bg-primary px-2 py-0.5 text-sm font-medium text-white"
                                >
                                    {post?.topic?.name}
                                </button>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    {post?.tags?.map((tag) => (
                                        <div key={tag._id}>• {tag?.name}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

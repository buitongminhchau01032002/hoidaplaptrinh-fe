'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import striptags from 'striptags';
import { API } from '~/constants';

function stringToSlug(str) {
    // remove accents
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
}

function Search() {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [searchPosts, setSearchPosts] = useState([]);

    useEffect(() => {
        fetch(`${API}/posts`)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(error);
                }
                setPosts(resJson.data);
            });
    }, []);

    useEffect(() => {
        if (!search) {
            setSearchPosts([]);
            return;
        }
        const newSearchPosts = posts
            .filter((post) => stringToSlug(post.title).includes(stringToSlug(search)))
            .slice(0, 5);
        setSearchPosts(newSearchPosts);
    }, [posts, search]);

    return (
        <div className="group group relative">
            <div className="flex h-9 min-w-[520px] items-center rounded-md border border-gray-400 focus-within:!border-primary hover:border-gray-500">
                <div className="pl-3 text-gray-600">
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
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>

                <input
                    className="h-full flex-1 rounded-md px-2"
                    placeholder="Search post ... "
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            {search.length > 0 && (
                <div className="invisible absolute left-0 right-0 top-10 max-h-[500px] overflow-y-auto rounded border bg-white p-2 shadow-lg group-focus-within:visible">
                    <div className="space-y-3">
                        {searchPosts.length === 0 && (
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

                                <p className="mt-2">Couldn't find any posts</p>
                            </div>
                        )}
                        {searchPosts?.map((post) => (
                            <div key={post._id} className="rounded-lg border bg-white p-3">
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
                                        {post.author?.role}
                                    </div>
                                </Link>
                                <Link href={'/' + post._id} className="block">
                                    <h2 className="py-1 font-bold">{post.title}</h2>
                                    <div className="text-sm text-gray-600">
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
                                    <div className="rounded bg-primary px-2 py-0.5 text-sm font-medium text-white">
                                        {post?.topic?.name}
                                    </div>
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
            )}
        </div>
    );
}

export default Search;

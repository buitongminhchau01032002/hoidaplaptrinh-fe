'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';

const ITEM = [
    {
        name: 'Posts',
        link: '/post',
    },
    {
        name: 'Topics',
        link: '/topic',
    },
    {
        name: 'Users',
        link: '/user',
    },
];

export default function ManageMenu() {
    const segment = useSelectedLayoutSegment();
    const [mounted, setMouted] = useState(false);
    const user = useSelector(userSelector);

    useEffect(() => {
        setMouted(true);
    }, []);
    console.log(segment);
    return (
        mounted && (
            <div className="bg-white">
                <Link
                    className={clsx('block border-b p-3 font-semibold', {
                        'text-primary': segment === 'post',
                    })}
                    href="/manage/post"
                >
                    Posts
                </Link>
                {user?.role === 'Administrator' && (
                    <Link
                        className={clsx('block border-b p-3 font-semibold', {
                            'text-primary': segment === 'topic',
                        })}
                        href="/manage/topic"
                    >
                        Topics
                    </Link>
                )}
                <Link
                    className={clsx('block border-b p-3 font-semibold', {
                        'text-primary': segment === 'user',
                    })}
                    href="/manage/user"
                >
                    Users
                </Link>
            </div>
        )
    );
}

'use client';

import { useDispatch, useSelector } from 'react-redux';
import Popover from '../PopoverClient';
import Search from './Search';
import { userSelector } from '~/redux/selectors';
import { userActions } from '~/redux/slices/userSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        mounted && (
            <header className="fixed z-10 flex h-14 w-full items-center justify-between border-b bg-white px-16">
                <Link href="/" className="h-7">
                    {/* <img className="h-full object-cover object-center" src="/next.svg" /> */}
                    <div className="text-3xl font-bold">DevZ</div>
                </Link>

                {/* SEARCH */}
                <Search />

                {/* ACTION GROUP */}
                {user ? (
                    <div className="flex items-center space-x-3">
                        <Link
                            href="/create-post"
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                        >
                            <span className="pr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6 pt-0.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Create post</span>
                        </Link>

                        <div className="flex items-center space-x-1">
                            <Link
                                href={'/profile/' + user._id}
                                className="h-9 w-9 overflow-hidden rounded-full ring-primary hover:ring-2"
                            >
                                <img className="h-full w-full object-cover" src={user?.avatar} />
                            </Link>

                            <Popover className="relative">
                                <Popover.Button
                                    as="button"
                                    className="outline-none hover:text-primary-dark"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Popover.Button>

                                <Popover.Panel className="absolute right-0 top-full z-10 w-80 translate-y-3 space-y-3 rounded-lg border bg-white p-3 shadow-xl">
                                    <Link
                                        href={'/profile/' + user._id}
                                        className="flex w-full items-center border-b pb-2"
                                    >
                                        <div className="h-11 w-11 overflow-hidden rounded-full">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={user?.avatar}
                                            />
                                        </div>
                                        <div className="ml-3 overflow-hidden">
                                            <p className="text-left font-bold">
                                                {user?.first_name + ' ' + user?.last_name}
                                            </p>
                                            <p className="text-left text-sm text-gray-600">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </Link>

                                    {(user?.role === 'Administrator' ||
                                        user?.role === 'Moderator') && (
                                        <Link
                                            href="/manage"
                                            className="flex justify-center rounded-md bg-gray-100 py-2 text-sm font-semibold hover:bg-gray-200"
                                        >
                                            Manage
                                        </Link>
                                    )}

                                    <button
                                        onClick={() => dispatch(userActions.logout())}
                                        className="flex h-9 w-full min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                                    >
                                        Logout
                                    </button>
                                </Popover.Panel>
                            </Popover>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Link
                            href="/register"
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary hover:text-white"
                        >
                            Register
                        </Link>
                        <Link
                            href="/login"
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </header>
        )
    );
}

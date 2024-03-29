'use client';

import { useDispatch, useSelector } from 'react-redux';
import Popover from '../PopoverClient';
import Search from './Search';
import { userSelector } from '~/redux/selectors';
import { userActions } from '~/redux/slices/userSlice';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import NotiCard from './NotiCard';
import {
    notisSelector,
    unreadNotiCountSelector,
    unreadNotisSelector,
} from '~/redux/selectors/notisSelector';
import { socket } from '../NotiHandler';
import { SOCKET_EVENT } from '~/constants';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const notis = useSelector(notisSelector);
    console.log('noti: ', notis);
    const unreadNotis = useMemo(() => notis?.filter((noti) => noti.is_read === false), [notis]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    function logout() {
        const userId = user?.id;
        dispatch(userActions.logout());
        socket.emit(SOCKET_EVENT.LogOut, userId);
        console.log('client logged out');
    }

    return (
        mounted && (
            <header className="fixed z-10 flex h-14 w-full items-center justify-between border-b bg-white px-16">
                <Link href="/" className="block">
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

                        {/* NOTI */}
                        <Popover className="relative">
                            <Popover.Button
                                as="button"
                                className="flex items-center outline-none hover:text-primary-dark"
                            >
                                <div className="relative px-2 py-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-7 w-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                        />
                                    </svg>

                                    {unreadNotis?.length > 0 && (
                                        <div className="absolute right-0 top-0 rounded-full bg-red-400 px-2 py-0.5 text-[11px] font-medium text-white">
                                            {unreadNotis?.length}
                                        </div>
                                    )}
                                </div>
                            </Popover.Button>

                            <Popover.Panel className="absolute right-0 top-full z-10 max-h-[500px] w-[450px] overflow-y-auto rounded-lg border bg-white p-2 shadow-xl">
                                {({ close }) =>
                                    notis?.map((noti) => (
                                        <NotiCard
                                            key={noti?._id}
                                            noti={noti}
                                            onClick={() => close()}
                                        />
                                    ))
                                }
                            </Popover.Panel>
                        </Popover>

                        {/* USER */}
                        <div className="flex items-center space-x-1">
                            <Link
                                href={'/profile/' + user._id}
                                className="h-9 w-9 overflow-hidden rounded-full ring-primary hover:ring-2"
                            >
                                <img className="h-full w-full object-cover" src={user?.avatar} />
                            </Link>

                            {/* USER */}
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
                                        onClick={() => logout()}
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

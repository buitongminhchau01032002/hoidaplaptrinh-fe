'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';

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

export default function ManageTopicPage() {
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);
    const [typeUser, setTypeUser] = useState('all');
    const [search, setSearch] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [typeUser]);

    function fetchUsers() {
        setLoading(true);

        let q = '';
        if (typeUser === 'moderator') {
            q = '?roletype=1';
        } else if (typeUser === 'member') {
            q = '?roletype=2';
        }
        fetch(`${API}/users${q}`, {
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
                setUsers(resJson.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (!search) {
            setSearchUsers(users);
            return;
        }
        const newSearchUsers = users.filter((_user) =>
            stringToSlug(_user?.first_name + ' ' + _user?.last_name).includes(stringToSlug(search))
        );
        setSearchUsers(newSearchUsers);
    }, [search, users]);

    function handleSetAsModerator(id) {}

    function handleSetAsMember(id) {
        fetch(`${API}/users/${id}/change-role`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role_type: 2 }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    toast.error('Something went wrong!');
                    return;
                }
                toast.success('Set member successfully!');
                fetchUsers();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong!');
            });
    }

    function handleSetAsMember(id) {
        fetch(`${API}/users/${id}/change-role`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role_type: 2 }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    toast.error('Something went wrong!');
                    return;
                }
                toast.success('Set member successfully!');
                fetchUsers();
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong!');
            });
    }

    return (
        <div>
            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                <div className="flex items-center space-x-2">
                    <div className="flex h-9 items-center rounded-md border border-gray-400 bg-white focus-within:!border-primary hover:border-gray-500">
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
                            placeholder="Search user ... "
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex font-medium">
                    <button
                        className={clsx('rounded px-3 py-1.5 text-primary', {
                            '!bg-primary !text-white': typeUser === 'all',
                        })}
                        onClick={() => setTypeUser('all')}
                    >
                        All
                    </button>
                    <button
                        className={clsx('rounded px-3 py-1.5 text-primary', {
                            '!bg-primary !text-white': typeUser === 'moderator',
                        })}
                        onClick={() => setTypeUser('moderator')}
                    >
                        Moderator
                    </button>
                    <button
                        className={clsx('rounded px-3 py-1.5 text-primary', {
                            '!bg-primary !text-white': typeUser === 'member',
                        })}
                        onClick={() => setTypeUser('member')}
                    >
                        Member
                    </button>
                </div>
            </div>

            <div className="mt-3">
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
                    searchUsers?.map((_user) =>
                        _user?.role ? (
                            <div
                                key={_user?._id}
                                className="flex items-center justify-between border-b bg-white p-3"
                            >
                                <div className="flex w-full items-center pb-2">
                                    <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={_user?.avatar}
                                        />
                                    </div>
                                    <div className="ml-3 space-y-1 overflow-hidden">
                                        <p className="text-left text-lg font-bold">
                                            {_user?.first_name + ' ' + _user?.last_name}
                                        </p>
                                        <p className="text-left text-gray-600">{_user?.email}</p>
                                        <div className="inline-block rounded border bg-gray-100 px-3 py-1">
                                            {_user?.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[200px] space-y-2">
                                    {_user?.role === 'Member' && (
                                        <button
                                            className="flex h-9 w-full items-center justify-center rounded-md bg-orange-500 px-5 text-sm font-medium text-white transition hover:bg-orange-600"
                                            onClick={() => handleSetAsModerator(_user?.id)}
                                        >
                                            Set as Moderator
                                        </button>
                                    )}
                                    {_user?.role === 'Moderator' && (
                                        <button
                                            className="flex h-9 w-full items-center justify-center rounded-md bg-slate-500 px-5 text-sm font-medium text-white transition hover:bg-slate-700"
                                            onClick={() => handleSetAsMember(_user?.id)}
                                        >
                                            Set as Member
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    )}
            </div>
        </div>
    );
}

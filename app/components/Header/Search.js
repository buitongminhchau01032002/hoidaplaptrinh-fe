'use client';

import { useState } from 'react';

function Search() {
    const [search, setSearch] = useState('');
    return (
        <div className="group relative">
            <div className="flex h-9 min-w-[520px] rounded-md border border-gray-400 focus-within:!border-primary hover:border-gray-500">
                <input
                    className="h-full flex-1 rounded-md px-3"
                    placeholder="Tìm kiếm bài viết..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            {search.length > 0 && (
                <div className="absolute left-0 right-0 top-10 bg-white p-2 shadow-sm">
                    <div className="space-y-3">
                        <div className="rounded-lg border bg-white p-3">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover"
                                            src="http://res.cloudinary.com/psncloud/image/upload/v1684641422/105511200.png"
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Minh Chau
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </div>
                            <div className="py-1 font-bold">
                                Xem hình mèo để có thể code ít bug hơn?
                            </div>
                            <div className="text-lgray-700 text-sm">
                                Có phải việc xem hình mèo sẽ giúp code ít bug hơn không? Nếu đúng
                                như vậy thì có thể tìm hình mèo ở đâu
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white p-3">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover"
                                            src="https://res.cloudinary.com/psncloud/image/upload/v1684654840/297441000.png"
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Tran Phuc
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </div>
                            <div className="py-1 font-bold">
                                Tài liệu học Design Pattern ở đâu là đầy đủ nhất?
                            </div>
                            <div className="text-lgray-700 text-sm">
                                Mọi người cho em hỏi là một ứng dụng quản lý cần những Design
                                Pattern nào?
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white p-3">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                        <img
                                            className="h-full w-full object-cover"
                                            src="http://res.cloudinary.com/psncloud/image/upload/v1684641422/105511200.png"
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Minh Chau
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </div>
                            <div className="py-1 font-bold">
                                Cách kiểm tra 1 máy tính đã từng kết nối internet?
                            </div>
                            <div className="text-lgray-700 text-sm">
                                Công ty mình không cho phép sử dụng máy tính tại công ty để truy cập
                                internet và sắp tới mình được sếp giao nhiệm vụ
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;

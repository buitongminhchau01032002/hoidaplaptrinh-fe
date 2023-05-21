'use client';

import colorizeCategory from '~/utils/colorizeCategory';

export default function Sidebar() {
    return (
        <div>
            <div className="mb-5">
                <p className="text-xl font-semibold">Topics</p>
                <div className="mt-3 flex flex-wrap">
                    <button
                        style={{
                            backgroundColor: colorizeCategory({
                                createdAt: '2023-04-07T05:49:10.259+00:00',
                            }),
                        }}
                        className=" mb-1 mr-1 rounded px-3 py-1 font-semibold text-white"
                    >
                        Javascript
                    </button>
                    <button
                        style={{
                            backgroundColor: colorizeCategory({
                                createdAt: '2023-04-07T05:42:23.259+00:00',
                            }),
                        }}
                        className=" mb-1 mr-1 rounded px-3 py-1 font-semibold text-white"
                    >
                        HTML, CSS
                    </button>
                    <button
                        style={{
                            backgroundColor: colorizeCategory({
                                createdAt: '2023-04-07T05:20:53.259+00:00',
                            }),
                        }}
                        className=" mb-1 mr-1 rounded px-3 py-1 font-semibold text-white"
                    >
                        Golang
                    </button>
                    <button
                        style={{
                            backgroundColor: colorizeCategory({
                                createdAt: '2023-04-07T05:10:28.259+00:00',
                            }),
                        }}
                        className=" mb-1 mr-1 rounded px-3 py-1 font-semibold text-white"
                    >
                        Pascal
                    </button>
                    <button
                        style={{
                            backgroundColor: colorizeCategory({
                                createdAt: '2023-04-03T05:30:03.259+00:00',
                            }),
                        }}
                        className=" mb-1 mr-1 rounded px-3 py-1 font-semibold text-white"
                    >
                        Java
                    </button>
                    <button
                        style={{
                            backgroundColor: colorizeCategory({
                                createdAt: '2023-04-03T05:30:40.259+00:00',
                            }),
                        }}
                        className=" mb-1 mr-1 rounded px-3 py-1 font-semibold text-white"
                    >
                        C#
                    </button>
                </div>
            </div>
            <div className="mb-5">
                <p className="text-xl font-semibold">Trending</p>
                <div className="mt-3 space-y-3">
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="http://res.cloudinary.com/psncloud/image/upload/v1684641422/105511200.png"
                                    />
                                </div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Minh Chau</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">
                            Xem hình mèo để có thể code ít bug hơn?
                        </div>
                        <div className="text-lgray-700 text-sm">
                            Có phải việc xem hình mèo sẽ giúp code ít bug hơn không? Nếu đúng như
                            vậy thì có thể tìm hình mèo ở đâu
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://res.cloudinary.com/psncloud/image/upload/v1684654840/297441000.png"
                                    />
                                </div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Tran Phuc</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">
                            Tài liệu học Design Pattern ở đâu là đầy đủ nhất?
                        </div>
                        <div className="text-lgray-700 text-sm">
                            Mọi người cho em hỏi là một ứng dụng quản lý cần những Design Pattern
                            nào?
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 overflow-hidden rounded-full bg-red-500">
                                    <img
                                        className="h-full w-full object-cover"
                                        src="http://res.cloudinary.com/psncloud/image/upload/v1684641422/105511200.png"
                                    />
                                </div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Minh Chau</p>
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
        </div>
    );
}

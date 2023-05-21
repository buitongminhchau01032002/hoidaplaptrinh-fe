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
            {/* <div className="mb-5">
                <p className="text-xl font-semibold">Newest</p>
                <div className="mt-3 space-y-3">
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full bg-red-500"></div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Nguyễn Văn A</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">Beautiful hand-crafted SVG icons</div>
                        <div className="text-lgray-700 text-sm">
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full bg-red-500"></div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Nguyễn Văn A</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">Beautiful hand-crafted SVG icons</div>
                        <div className="text-lgray-700 text-sm">
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="h-7 w-7 rounded-full bg-red-500"></div>
                                <p className="ml-2 text-sm font-bold text-gray-700">Nguyễn Văn A</p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                Member
                            </div>
                        </div>
                        <div className="py-1 font-bold">Beautiful hand-crafted SVG icons</div>
                        <div className="text-lgray-700 text-sm">
                            There are many variations of passages of Lorem Ipsum available, but the
                            majority have suffered alteration
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

'user client';

import Link from 'next/link';
import VoteControl from '~/app/components/VoteControl';

export default function ManagePostPage() {
    return (
        <div className="">
            {/* TOP BAR */}
            <div className="flex items-center justify-between rounded-lg bg-white p-3">
                <div className="flex w-[200px] items-center justify-between rounded border px-3 py-1">
                    <span>All topics</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <div className="flex font-medium">
                    <div className="rounded bg-primary px-3 py-1.5 text-white">Pedding</div>
                    <div className="rounded px-3 py-1.5 text-primary">Denied</div>
                    <div className="rounded px-3 py-1.5 text-primary">Blocked</div>
                </div>
            </div>
            <div className="mt-4 space-y-4">
                <div className="flex rounded-lg bg-white">
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
                                            src="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Phuc Tran
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </Link>

                            {/* Date */}
                            <div className="text-sm text-gray-600">27/6/2023</div>
                        </div>

                        {/* Main */}
                        <Link href={'/'} className="mt-4 block">
                            <h2 className="text-lg font-bold">
                                Phương pháp tạo và quản lý API trong ứng dụng web
                            </h2>
                            <div className="mt-2 text-gray-600">
                                Chào mọi người, Mình muốn thảo luận về phương pháp tạo và quản lý
                                API trong ứng dụng web. Việc xây dựng một hệ thống API hiệu quả và
                                dễ dàng quản lý là rất quan trọng để đảm bảo sự linh hoạt và mở rộng
                                trong quá trình phát triển...
                            </div>
                            <div className="mt-3 flex items-center">
                                <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                    Discuss
                                </div>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    <div>• API</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="w-28 space-y-2 p-3">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Approve
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Deny
                        </button>
                    </div>
                </div>
                <div className="flex rounded-lg bg-white">
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
                                            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/avocados-title-c32b587.jpg"
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Tran Phuc
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </Link>

                            {/* Date */}
                            <div className="text-sm text-gray-600">26/6/2023</div>
                        </div>

                        {/* Main */}
                        <Link href={'/'} className="mt-4 block">
                            <h2 className="text-lg font-bold">
                                Tối ưu hóa tốc độ tải trang trong ứng dụng web
                            </h2>
                            <div className="mt-2 text-gray-600">
                                Xin chào cả nhà, Mình đang gặp phải vấn đề về tốc độ tải trang trong
                                ứng dụng web và muốn thảo luận với mọi người về các phương pháp tối
                                ưu hóa hiệu suất. Hiện tại, ứng dụng web của mình có thời gian tải
                                trang chậm và điều này ảnh...
                            </div>
                            <div className="mt-3 flex items-center">
                                <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                    Discuss
                                </div>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    <div>• Web</div>
                                    <div>• Optimize</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="w-28 space-y-2 p-3">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Approve
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Deny
                        </button>
                    </div>
                </div>
                <div className="flex rounded-lg bg-white">
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
                                            src="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
                                        />
                                    </div>
                                    <p className="ml-2 text-sm font-bold text-gray-700">
                                        Phuc Tran
                                    </p>
                                </div>
                                <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                    Member
                                </div>
                            </Link>

                            {/* Date */}
                            <div className="text-sm text-gray-600">20/6/2023</div>
                        </div>

                        {/* Main */}
                        <Link href={'/'} className="mt-4 block">
                            <h2 className="text-lg font-bold">
                                Sử dụng Git và quy trình làm việc nhóm hiệu quả
                            </h2>
                            <div className="mt-2 text-gray-600">
                                Xin chào mọi người, Mình muốn thảo luận về việc sử dụng Git và quy
                                trình làm việc nhóm hiệu quả. Git đã trở thành một công cụ quan
                                trọng trong quản lý phiên bản và phát triển phần mềm, đồng thời quy
                                trình làm việc...
                            </div>
                            <div className="mt-3 flex items-center">
                                <div className="rounded bg-primary px-2 py-1 text-sm font-medium text-white">
                                    Discuss
                                </div>
                                <div className="ml-2 flex space-x-2 text-sm text-gray-600">
                                    <div>• Git</div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="w-28 space-y-2 p-3">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Approve
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Deny
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

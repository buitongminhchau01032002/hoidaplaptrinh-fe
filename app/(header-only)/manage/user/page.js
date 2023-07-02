'use client';

export default function ManageTopicPage() {
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
                        />
                    </div>
                </div>
                <div className="flex font-medium">
                    <div className="rounded bg-primary px-3 py-1.5 text-white">All</div>
                    <div className="rounded px-3 py-1.5 text-primary">Administrator</div>
                    <div className="rounded px-3 py-1.5 text-primary">Moderator</div>
                    <div className="rounded px-3 py-1.5 text-primary">Member</div>
                </div>
            </div>

            <div className="mt-3 space-y-3 bg-white p-3">
                <div className="flex items-center justify-between border-b">
                    <div className="flex w-full items-center pb-2">
                        <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                            <img
                                className="h-full w-full object-cover"
                                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1143&q=80"
                            />
                        </div>
                        <div className="ml-3 space-y-1 overflow-hidden">
                            <p className="text-left text-lg font-bold">Minh Chau</p>
                            <p className="text-left text-gray-600">minhchau@gmail.com</p>
                            <div className="inline-block rounded border bg-gray-100 px-3 py-1">
                                Administrator
                            </div>
                        </div>
                    </div>
                    <div className="w-[200px] space-y-2">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-orange-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Moderator
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-yellow-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Member
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between border-b">
                    <div className="flex w-full items-center pb-2">
                        <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                            <img
                                className="h-full w-full object-cover"
                                src="https://images.immediate.co.uk/production/volatile/sites/30/2017/06/oranges-85fb2b6.jpg"
                            />
                        </div>
                        <div className="ml-3 space-y-1 overflow-hidden">
                            <p className="text-left text-lg font-bold">Hung Cao</p>
                            <p className="text-left text-gray-600">caohung@gmail.com</p>
                            <div className="inline-block rounded border bg-gray-100 px-3 py-1">
                                Moderator
                            </div>
                        </div>
                    </div>
                    <div className="w-[200px] space-y-2">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-purple-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Admin
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-yellow-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Member
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between border-b">
                    <div className="flex w-full items-center pb-2">
                        <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                            <img
                                className="h-full w-full object-cover"
                                src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/318601_2200-732x549.jpg?w=756&h=567"
                            />
                        </div>
                        <div className="ml-3 space-y-1 overflow-hidden">
                            <p className="text-left text-lg font-bold">Tran Nam</p>
                            <p className="text-left text-gray-600">namtran@gmail.com</p>
                            <div className="inline-block rounded border bg-gray-100 px-3 py-1">
                                Moderator
                            </div>
                        </div>
                    </div>
                    <div className="w-[200px] space-y-2">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-orange-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Admin
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-yellow-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Member
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between border-b">
                    <div className="flex w-full items-center pb-2">
                        <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                            <img
                                className="h-full w-full object-cover"
                                src="https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w="
                            />
                        </div>
                        <div className="ml-3 space-y-1 overflow-hidden">
                            <p className="text-left text-lg font-bold">Phuc Tran</p>
                            <p className="text-left text-gray-600">phuctran@gmail.com</p>
                            <div className="inline-block rounded border bg-gray-100 px-3 py-1">
                                Member
                            </div>
                        </div>
                    </div>
                    <div className="w-[200px] space-y-2">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-purple-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Admin
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-orange-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Moderator
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between border-b">
                    <div className="flex w-full items-center pb-2">
                        <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                            <img
                                className="h-full w-full object-cover"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrE1p9xNBXToyhlx53v1Mx7wlaFKkbS4z0-A&usqp=CAU"
                            />
                        </div>
                        <div className="ml-3 space-y-1 overflow-hidden">
                            <p className="text-left text-lg font-bold">Thanh Nhi</p>
                            <p className="text-left text-gray-600">thanhnhi@gmail.com</p>
                            <div className="inline-block rounded border bg-gray-100 px-3 py-1">
                                Member
                            </div>
                        </div>
                    </div>
                    <div className="w-[200px] space-y-2">
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-purple-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Admin
                        </button>
                        <button className="flex h-9 w-full items-center justify-center rounded-md bg-orange-500 px-5 text-sm font-medium text-white transition hover:bg-primary-dark">
                            Set as Moderator
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

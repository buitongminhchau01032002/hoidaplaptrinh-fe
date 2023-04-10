'use client';

function Search() {
    return (
        <div className="group relative">
            <div className="flex h-9 min-w-[520px] rounded-md border border-gray-400 focus-within:!border-primary hover:border-gray-500">
                <input className="h-full flex-1 rounded-md px-3" placeholder="Tìm kiếm bài viết..." />
            </div>
        </div>
    );
}

export default Search;

export default function NotiCard({ noti }) {
    return (
        <div className="flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-100">
            <img className="h-14 w-14 rounded-full bg-gray-300 " />
            <div className="flex-1 px-2">
                <div className="flex items-baseline">
                    <p className="font-semibold">Minh Chau</p>
                    <p className="ml-2 text-xs font-medium text-primary">• 12:12 12.3.2023</p>
                </div>
                <p className="text-sm text-gray-700">
                    Minh Chau has unblocked the comments of your post.
                </p>
            </div>
            <div className="h-3 w-3 rounded-full bg-primary"></div>
        </div>
    );
}

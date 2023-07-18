import clsx from 'clsx';
import moment from 'moment';

export default function NotiCard({ noti }) {
    return (
        <div className="flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-100">
            <img className="h-14 w-14 rounded-full bg-gray-300" src={noti?.image} />
            <div className="flex-1 px-2">
                <div className="flex items-baseline">
                    <p className="font-semibold">{noti?.actor_name}</p>
                    <p className="ml-2 text-xs font-medium text-primary">{`• ${moment(
                        noti.created_at
                    ).format('HH:MM DD/MM/YYYY')}`}</p>
                </div>
                <p className="text-sm text-gray-700">{noti?.content}</p>
            </div>
            <div
                className={clsx('h-3 w-3 rounded-full bg-primary', {
                    'opacity-0': noti?.is_read,
                })}
            ></div>
        </div>
    );
}

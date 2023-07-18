'use client';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';
import { notisActions } from '~/redux/slices/notiSlice';

export default function NotiCard({ noti, onClick }) {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const router = useRouter();

    function handleClickNoti() {
        router.push(`/${noti?.post_id}`);
        fetch(`${API}/notifications/${noti?._id}/read`, {
            method: 'POST',
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
                dispatch(notisActions.setNoti(resJson.data));
            });
        onClick();
    }
    return (
        <div
            className="flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-100"
            onClick={handleClickNoti}
        >
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
                className={clsx('h-3 w-3 rounded-full bg-red-400', {
                    'opacity-0': noti?.is_read,
                })}
            ></div>
        </div>
    );
}

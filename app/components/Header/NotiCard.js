'use client';
import clsx from 'clsx';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';
import { notisActions } from '~/redux/slices/notiSlice';

const NOTI_TYPE = {
    CreateComment: 'create-comment',
    CreateReply: 'create-reply',
    ApprovePost: 'approve-post',
    DenyPost: 'deny-post',
    ApproveComment: 'approve-comment',
    UnapproveComment: 'unapprove-comment',
    BlockPost: 'block-post',
    UnblockPost: 'unblock-post',
};

export default function NotiCard({ noti, onClick }) {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const router = useRouter();

    function handleClickNoti() {
        if (
            noti.event === NOTI_TYPE.CreateComment ||
            noti.event === NOTI_TYPE.CreateReply ||
            noti.event === NOTI_TYPE.ApproveComment ||
            noti.event === NOTI_TYPE.UnapproveComment
        ) {
            // go to post and scroll to comment
            router.push(`/${noti?.post_id}?comment-id=${noti.comment_id}`);
        } else if (noti.event !== NOTI_TYPE.DenyPost) {
            // go to post
            router.push(`/${noti?.post_id}`);
        }

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
                fetchNotis();
            });
        onClick();
    }

    function fetchNotis() {
        fetch(`${API}/notifications`, {
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
                console.log('get noti');
                dispatch(notisActions.setNoti(resJson.data));
            });
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

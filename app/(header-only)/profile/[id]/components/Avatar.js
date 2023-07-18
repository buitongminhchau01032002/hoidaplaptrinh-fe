import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '~/constants';
import { userActions } from '~/redux/slices/userSlice';

export default function Avatar({ user, currentUser, isOwner, onChange }) {
    const [review, setReview] = useState(user?.avatar);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setReview(user?.avatar);
    }, [user?.avatar]);

    async function handleUploadImage(e) {
        const file = e.target?.files?.[0];
        if (file) {
            setReview(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append('image', file);
            setLoading(true);

            try {
                const uploadObj = await fetch(`${API}/upload/images/single`, {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + currentUser?.token,
                    },
                    body: formData,
                }).then((res) => res.json());
                const resJson = await fetch(`${API}/me`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + currentUser?.token,
                    },
                    body: JSON.stringify({ avatar: uploadObj.data }),
                }).then((res) => res.json());
                console.log(resJson);
                if (resJson.error_key) {
                    toast.error('Something went wrong');
                }
                dispatch(
                    userActions.update({
                        avatar: uploadObj.data,
                    })
                );
            } catch (err) {
                console.log(err);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div className="relative h-44 w-44 ">
                <img
                    className="h-full w-full overflow-hidden rounded-full border object-cover"
                    src={review}
                />
                {isOwner && (
                    <label
                        className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400"
                        htmlFor="edit-avatar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                        </svg>
                    </label>
                )}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-8 w-8 animate-spin"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )}
                <input
                    type="file"
                    id="edit-avatar"
                    className="hidden"
                    onChange={handleUploadImage}
                />
            </div>
        </>
    );
}

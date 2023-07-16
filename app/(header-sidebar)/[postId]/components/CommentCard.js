'use client';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostContentEditor from '~/app/components/PostContentEditor';
import VoteControl from '~/app/components/VoteControl';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';
import clsx from 'clsx';
import CommentVoteControl from '~/app/components/CommentVoteControl';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    content: Yup.string().required('Content is required'),
});

export default function CommentCard({ post, comment, onChange, onChangePost }) {
    const user = useSelector(userSelector);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openReplyDialog, setOpenReplyDialog] = useState(false);
    function handleDownVote() {
        fetch(`${API}/comments/${comment._id}/down-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
            })
            .finally(() => {
                onChangePost();
            });
    }
    function handleUpVote() {
        fetch(`${API}/comments/${comment._id}/up-vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
            })
            .finally(() => {
                onChangePost();
            });
    }

    function handleUnApproveComment() {
        fetch(`${API}/comments/${comment._id}/un-approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
            })
            .finally(() => {
                onChangePost();
            });
    }
    function handleApproveComment() {
        fetch(`${API}/comments/${comment._id}/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
            })
            .finally(() => {
                onChangePost();
            });
    }

    function handleDeleteComment() {
        fetch(`${API}/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson);
                    return;
                }
                toast.success('Delete comment successfully!');
                setOpenDeleteDialog(false);
            })
            .catch((err) => {
                toast.error('Some thing went wrong!');
            })
            .finally(() => {
                onChangePost();
            });
    }

    return (
        <>
            <div className="flex px-2 py-3">
                {/* SCORE */}
                <div className="flex w-[52px] flex-col items-center border-r pr-3">
                    <CommentVoteControl
                        upVotes={comment.up_votes}
                        downVotes={comment.down_votes}
                        onUp={handleUpVote}
                        onDown={handleDownVote}
                    />
                    {user?._id === post?.author?._id && (
                        <>
                            {comment.is_approved_by_post_owner ? (
                                <button className="text-green-600" onClick={handleUnApproveComment}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="h-10 w-10"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            ) : (
                                user?._id !== comment?.author?._id && (
                                    <button
                                        className="mt-3 text-gray-600"
                                        onClick={handleApproveComment}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                )
                            )}
                        </>
                    )}

                    {user?._id !== post?.author?._id && comment.is_approved_by_post_owner && (
                        <div className="text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-10 w-10"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2 pl-3">
                    <div className="flex items-center justify-between">
                        {/* User */}
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <img
                                    className="h-7 w-7 rounded-full bg-red-500 object-cover"
                                    src={comment?.author?.avatar}
                                />
                                <p className="ml-2 text-sm font-bold text-gray-700">
                                    {comment?.author?.first_name + ' ' + comment?.author?.last_name}
                                </p>
                            </div>
                            <div className="ml-3 rounded border bg-gray-100 px-2 text-sm">
                                {comment?.author?.role}
                            </div>
                            {/* Date */}
                            <div className="ml-2 text-sm text-gray-600">
                                {`• ${moment(comment?.created_at).format('DD.MM.YYYY')}`}
                            </div>
                        </div>

                        {user?._id === comment?.author?._id && (
                            <div className="flex space-x-2">
                                {/* EIDT */}
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>
                                </button>
                                {/* DELETE */}
                                <button
                                    className="text-red-500"
                                    onClick={() => setOpenDeleteDialog(true)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Content */}
                    <div dangerouslySetInnerHTML={{ __html: comment?.content }}></div>

                    <button
                        className="flex items-center space-x-2 rounded border px-2 py-0.5 hover:border-primary"
                        onClick={() => setOpenReplyDialog(true)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                            />
                        </svg>
                        <p className="text-sm">Reply</p>
                    </button>
                </div>
            </div>
            <Dialog
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/50"
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <Dialog.Panel className="min-w-[300px] rounded-lg bg-white p-5">
                    <Dialog.Title className="text-xl font-semibold leading-6">
                        Delete comment
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-gray-600">
                        Are you sure delete comment?
                    </Dialog.Description>

                    <div className="mt-4 flex space-x-2">
                        <button
                            className="flex h-9 items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary hover:text-white"
                            onClick={() => setOpenDeleteDialog(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex h-9 items-center justify-center rounded-md bg-red-500 px-5 text-sm font-medium text-white transition hover:bg-red-600"
                            onClick={handleDeleteComment}
                        >
                            Delete
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>

            <ReplyDialog
                open={openReplyDialog}
                setOpen={setOpenReplyDialog}
                comment={comment}
                post={post}
                onChange={onChange}
            />
        </>
    );
}

function ReplyDialog({ open, setOpen, comment, post, onChange }) {
    const [loading, setLoading] = useState(false);
    const user = useSelector(userSelector);
    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleCreateComment,
    });

    async function handleCreateComment(values) {
        setLoading(true);
        try {
            const data = await fetch(`${API}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({
                    ...values,
                    post_id: post?._id,
                    parent_comment_id: comment?._id,
                }),
            }).then((res) => res.json());
            if (data.error_key) {
                throw data.message;
            }
            formik.resetForm();
            onChange();
        } catch (error) {
            console.log(error);
            toast.error(error || 'Something is wrong!');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setFieldTouched('content', true);
    }, []);
    return (
        <Dialog
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/50"
            open={open}
            onClose={() => setOpen(false)}
        >
            <Dialog.Panel className="min-w-[600px] rounded-lg bg-white p-5">
                <Dialog.Title className="text-xl font-semibold leading-6">
                    Reply comment
                </Dialog.Title>
                <div className="mt-3">
                    <div
                        className={clsx('text-editor mt-1 rounded-sm', {
                            'ring-1 ring-red-500': formik.errors.content && formik.touched.content,
                        })}
                    >
                        <PostContentEditor
                            setFormik={handleChangeContent}
                            initValue={formik.initialValues.content}
                            setTouch={setTouchContent}
                        />
                    </div>
                    <div
                        className={clsx('invisible text-sm', {
                            '!visible text-red-500':
                                formik.errors.content && formik.touched.content,
                        })}
                    >
                        {formik.errors.content}
                    </div>
                    <button
                        type="submit"
                        onClick={formik.handleSubmit}
                        className={clsx(
                            'mt-2 flex h-9 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                            {
                                'pointer-events-none opacity-50': !formik.dirty || loading,
                            }
                        )}
                    >
                        Reply comment
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}

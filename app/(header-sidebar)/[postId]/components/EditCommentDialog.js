'use client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { API } from '~/constants';
import { userSelector } from '~/redux/selectors';
import { useCallback, useState } from 'react';
import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import PostContentEditor from '~/app/components/PostContentEditor';

const validationSchema = Yup.object({
    content: Yup.string().required('Content is required'),
});

export default function EditCommentDialog({ open, setOpen, comment, post, onChange }) {
    const [loading, setLoading] = useState(false);
    const user = useSelector(userSelector);
    const formik = useFormik({
        initialValues: {
            content: comment?.content || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleUpdate,
    });

    async function handleUpdate(values) {
        setLoading(true);
        try {
            const data = await fetch(`${API}/comments/${comment?._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify(values),
            }).then((res) => res.json());
            if (data.error_key) {
                throw data.message;
            }
            // formik.resetForm();
            toast.success('Update comment successfully');
            onChange();
        } catch (error) {
            console.log(error);
            toast.error(error || 'Something is wrong!');
        } finally {
            setLoading(false);
            setOpen(false);
            onChange();
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
                    Edit comment
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
                        Update comment
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}

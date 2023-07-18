'use client';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import PostContentEditor from '~/app/components/PostContentEditor';
import ImageInput from '~/app/components/ImageInput';
import { useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import { useRouter } from 'next/navigation';
import { API } from '~/constants';
import TopicInput from '../../components/TopicInput';
import TagsInput from '../../components/TagsInput';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    topic_id: Yup.string().required('Topic is required'),
});

export default function CreatePostPage({ params }) {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const user = useSelector(userSelector);
    const showSuccessNoti = () => toast.success('Update post successfully!');
    // const router = useRouter();

    useEffect(() => {
        getPost();
    }, []);
    function getPost() {
        fetch(`${API}/posts/` + params.postId)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    return;
                }
                setPost(resJson.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const formik = useFormik({
        initialValues: {
            title: post?.title || '',
            content: post?.content || '',
            topic_id: post?.topic?._id || '',
            tag_names: post?.tags?.map((t) => t.name) || [],
            images: [],
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleUpdatePost,
    });

    console.log(formik.values.images);

    async function handleUpdatePost(values) {
        setLoading(true);
        try {
            let linkImages;
            if (values.images.length > 0) {
                const formData = new FormData();
                values.images.forEach((image) => {
                    formData.append('images', image.file);
                });

                // Upload
                const uploadResult = await fetch(`${API}/upload/images/multiple`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: 'Bearer ' + user?.token,
                    },
                }).then((res) => res.json());
                if (uploadResult.error_key) {
                    throw uploadResult.message;
                }
                linkImages = uploadResult.data;
            }

            const data = await fetch(`${API}/posts/${post?._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user?.token,
                },
                body: JSON.stringify({ ...values, images: linkImages }),
            }).then((res) => res.json());
            console.log(data);
            if (data.error_key) {
                throw data.message;
            }
            // router.push('/profile/' + user?._id);
            // formik.resetForm();
            showSuccessNoti();
        } catch (error) {
            console.log(error);
            toast.error(error || 'Something is wrong!');
        } finally {
            setLoading(false);
        }
    }

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setFieldTouched('content', true);
    }, []);

    return (
        <div className="mt-5">
            <div className="mx-auto max-w-[720px] rounded-lg bg-white p-4">
                <p className="py-7 text-center text-2xl font-medium">EDIT POST</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="font-semibold">Title</label>
                        <input
                            name="title"
                            type="text"
                            className={clsx('text-input mt-1', {
                                invalid: formik.errors.title && formik.touched.title,
                            })}
                            placeholder="Post title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                        />
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.title && formik.touched.title,
                            })}
                        >
                            {formik.errors.title || 'No error message'}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="font-semibold">Content</label>
                        <div
                            className={clsx('text-editor mt-1 rounded-sm', {
                                'ring-1 ring-red-500':
                                    formik.errors.content && formik.touched.content,
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
                            {formik.errors.content || 'No error message'}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="font-semibold">Topic</label>
                        <TopicInput
                            name="topic_id"
                            className={clsx('text-input mt-1', {
                                invalid: formik.errors.topic_id && formik.touched.topic_id,
                            })}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.topic_id}
                        />
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.topic_id && formik.touched.topic_id,
                            })}
                        >
                            {formik.errors.topic_id || 'No er'}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="font-semibold">Tag</label>
                        <TagsInput formik={formik} />
                    </div>

                    <div className="mb-4">
                        <ImageInput
                            edit={false}
                            formik={formik}
                            formikField="images"
                            initImage={post?.images || []}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={clsx(
                                'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                                {
                                    'pointer-events-none opacity-50': !formik.dirty || loading,
                                }
                            )}
                        >
                            {/* <span className="pr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6 pt-0.5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span> */}
                            Update post
                        </button>

                        {loading && (
                            <div className="ml-4 flex items-center font-medium text-primary-dark">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6 animate-spin"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                                <div className="ml-1">Updating post ...</div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import { API } from '~/constants';

const validationSchema = Yup.object({
    old_password: Yup.string()
        .required('This field is required!')
        .min(6, 'Password must be at least 6 characters!'),
    password: Yup.string()
        .required('This field is required!')
        .min(6, 'Password must be at least 6 characters!'),
    confirm_password: Yup.string()
        .required('This field is required!')
        .min(6, 'Password must be at least 6 characters!'),
});

function Password({ user, currentUser, onChange, isOwner }) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            old_password: '',
            password: '',
            confirm_password: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        setLoading(true);
        fetch(`${API}/me/change-password`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error_key) {
                    console.log(resJson.error_key);
                    toast.error('Something went wrong');
                    return;
                }
                toast.success('Change passsword successfully!');
                setShow(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div>
            {show ? (
                <form className="mb-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="font-semibold">Current password</label>
                        <div className="mt-1 flex items-center space-x-1">
                            <input
                                name="old_password"
                                type="password"
                                className={clsx('text-input flex-1', {
                                    invalid:
                                        formik.errors.old_password && formik.touched.old_password,
                                    disabled: !isOwner,
                                })}
                                disabled={!isOwner}
                                placeholder="Current password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.old_password}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.old_password && formik.touched.old_password,
                            })}
                        >
                            {formik.errors.old_password || 'No error message'}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold">New password</label>
                        <div className="mt-1 flex items-center space-x-1">
                            <input
                                name="password"
                                type="password"
                                className={clsx('text-input flex-1', {
                                    invalid: formik.errors.password && formik.touched.password,
                                    disabled: !isOwner,
                                })}
                                disabled={!isOwner}
                                placeholder="New password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.password && formik.touched.password,
                            })}
                        >
                            {formik.errors.password || 'No error message'}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold">Confirm password</label>
                        <div className="mt-1 flex items-center space-x-1">
                            <input
                                name="confirm_password"
                                type="password"
                                className={clsx('text-input flex-1', {
                                    invalid:
                                        formik.errors.confirm_password &&
                                        formik.touched.confirm_password,
                                    disabled: !isOwner,
                                })}
                                disabled={!isOwner}
                                placeholder="Confirm password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm_password}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.confirm_password &&
                                    formik.touched.confirm_password,
                            })}
                        >
                            {formik.errors.confirm_password || 'No error message'}
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className={clsx(
                                'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark',
                                {
                                    'pointer-events-none opacity-50': loading || !formik.dirty,
                                }
                            )}
                        >
                            Đổi mật khẩu
                        </button>
                        <button
                            type="button"
                            className={clsx(
                                'flex h-9 min-w-[120px] items-center justify-center rounded-md border border-primary px-5 text-sm font-medium text-primary-dark transition hover:bg-primary/10',
                                {
                                    'pointer-events-none opacity-50': loading,
                                }
                            )}
                            onClick={() => setShow(false)}
                        >
                            Huỷ
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <label className="font-semibold">Mật khẩu</label>
                    <div className="mt-1 flex items-center space-x-1">
                        <input
                            name="name"
                            type="password"
                            value="111111"
                            className={clsx('text-input disabled flex-1')}
                            disabled
                            onChange={() => {}}
                        />
                        <button
                            className="flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark"
                            onClick={() => setShow(true)}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Password;

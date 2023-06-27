import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import { API } from '~/constants';

const validationSchema = Yup.object({
    currentPassword: Yup.string()
        .required('Trường này bắt buộc')
        .min(6, 'Mật khẩu phải ít nhất 6 kí tự'),
    newPassword: Yup.string()
        .required('Trường này bắt buộc')
        .min(6, 'Mật khẩu phải ít nhất 6 kí tự'),
    confirmNewPassword: Yup.string()
        .required('Trường này bắt buộc')
        .min(6, 'Mật khẩu phải ít nhất 6 kí tự'),
});

function Password({ user, currentUser, onChange, isOwner }) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        setLoading(true);
        fetch(`${API}/users/change_password`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    showErorrNoti();
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
                        <label className="font-semibold">Mật khẩu hiện tại</label>
                        <div className="mt-1 flex items-center space-x-1">
                            <input
                                name="currentPassword"
                                type="password"
                                className={clsx('text-input flex-1', {
                                    invalid:
                                        formik.errors.currentPassword &&
                                        formik.touched.currentPassword,
                                    disabled: !isOwner,
                                })}
                                disabled={!isOwner}
                                placeholder="Mật khẩu hiện tại"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.currentPassword}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.currentPassword && formik.touched.currentPassword,
                            })}
                        >
                            {formik.errors.currentPassword || 'No error message'}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold">Mật khẩu mới</label>
                        <div className="mt-1 flex items-center space-x-1">
                            <input
                                name="newPassword"
                                type="password"
                                className={clsx('text-input flex-1', {
                                    invalid:
                                        formik.errors.newPassword && formik.touched.newPassword,
                                    disabled: !isOwner,
                                })}
                                disabled={!isOwner}
                                placeholder="Mật khẩu mới"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.newPassword && formik.touched.newPassword,
                            })}
                        >
                            {formik.errors.newPassword || 'No error message'}
                        </div>
                    </div>
                    <div>
                        <label className="font-semibold">Nhập lại mật khẩu mới</label>
                        <div className="mt-1 flex items-center space-x-1">
                            <input
                                name="confirmNewPassword"
                                type="password"
                                className={clsx('text-input flex-1', {
                                    invalid:
                                        formik.errors.confirmNewPassword &&
                                        formik.touched.confirmNewPassword,
                                    disabled: !isOwner,
                                })}
                                disabled={!isOwner}
                                placeholder="Nhập lại mật khẩu mới"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmNewPassword}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500':
                                    formik.errors.confirmNewPassword &&
                                    formik.touched.confirmNewPassword,
                            })}
                        >
                            {formik.errors.confirmNewPassword || 'No error message'}
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

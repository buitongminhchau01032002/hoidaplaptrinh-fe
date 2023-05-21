import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import moment from 'moment';
import { userActions } from '~/redux/slices/userSlice';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    birthday: Yup.string(),
});

function Birthday({ user, currentUser, onChange, isOwner }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            birthday: (user?.birthday && moment(user?.birthday).format('YYYY-MM-DD')) || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        setLoading(true);
        const birthday = values.birthday;
        fetch('http://localhost:8080/api/v1/users/update', {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
            },
            body: JSON.stringify({ birthday }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_key) {
                    console.log(data.error_key);
                    return;
                }
                dispatch(
                    userActions.update({
                        birthday: birthday,
                    })
                );
                formik.resetForm();
                onChange();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div>
            <form className="mb-4" onSubmit={formik.handleSubmit}>
                <label className="font-semibold">Birthday</label>
                <div className="mt-1 flex items-center space-x-1">
                    <input
                        name="birthday"
                        type="date"
                        className={clsx('text-input flex-1', {
                            invalid: formik.errors.birthday && formik.touched.birthday,
                            disabled: !isOwner,
                        })}
                        disabled={!isOwner}
                        placeholder="Tên hiển thị"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.birthday}
                    />
                    {formik.dirty && (
                        <button
                            type="submit"
                            className={clsx(
                                'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark',
                                {
                                    'pointer-events-none opacity-50': loading,
                                }
                            )}
                        >
                            Cập nhật
                        </button>
                    )}
                </div>
                <div
                    className={clsx('invisible text-sm', {
                        '!visible text-red-500': formik.errors.birthday && formik.touched.birthday,
                    })}
                >
                    {formik.errors.birthday || 'No error message'}
                </div>
            </form>
        </div>
    );
}

export default Birthday;

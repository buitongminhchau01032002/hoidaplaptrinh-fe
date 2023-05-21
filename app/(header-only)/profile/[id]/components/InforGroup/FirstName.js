import clsx from 'clsx';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { userActions } from '~/redux/slices/userSlice';

const validationSchema = Yup.object({
    first_name: Yup.string().required('Trường này bắt buộc'),
});

function FirstName({ user, currentUser, onChange, isOwner }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name || '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    function handleSubmit(values) {
        setLoading(true);
        fetch(`http://localhost:8080/api/v1/users/update`, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error_key) {
                    console.log(data.error_key);
                    return;
                }
                dispatch(
                    userActions.update({
                        first_name: values.first_name,
                    })
                );
                onChange();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleCancel() {
        formik.resetForm();
    }
    return (
        <div>
            <form className="mb-4" onSubmit={formik.handleSubmit}>
                <label className="font-semibold">First name</label>
                <div className="mt-1 flex items-center space-x-1">
                    <input
                        name="first_name"
                        type="text"
                        className={clsx('text-input flex-1', {
                            invalid: formik.errors.first_name && formik.touched.first_name,
                            disabled: !isOwner,
                        })}
                        disabled={!isOwner}
                        placeholder="Tên hiển thị"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                    />
                    {formik.dirty && (
                        <>
                            <button
                                type="submit"
                                className={clsx(
                                    'flex h-9 min-w-[120px] items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary-dark',
                                    {
                                        'pointer-events-none opacity-50': loading,
                                    }
                                )}
                            >
                                Update
                            </button>
                            <div
                                onClick={handleCancel}
                                className={clsx(
                                    'btn btn-red h-9 min-w-[120px] cursor-pointer text-sm',
                                    {
                                        'pointer-events-none opacity-50': loading,
                                    }
                                )}
                            >
                                Cancel
                            </div>
                        </>
                    )}
                </div>
                <div
                    className={clsx('invisible text-sm', {
                        '!visible text-red-500':
                            formik.errors.first_name && formik.touched.first_name,
                    })}
                >
                    {formik.errors.first_name || 'No error message'}
                </div>
            </form>
        </div>
    );
}

export default FirstName;

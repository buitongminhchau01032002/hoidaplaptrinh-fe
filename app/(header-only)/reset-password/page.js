'use client';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { userActions } from '~/redux/slices/userSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
    password: Yup.string().required('Password required!'),
});

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [reseted, setReseted] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema,
        onSubmit: handleResetPassword,
    });

    function handleResetPassword(values) {
        // setLoading(true);
        setReseted(true);
        return;
        fetch('http://localhost:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error_key) {
                    console.log(resBody);
                    toast.error(resBody?.message || 'Something went wrong');
                    return;
                }

                const user = resBody.user;
                user.token = resBody.token;
                dispatch(userActions.login(user));
                console.log(user);
                toast.success('ResetPassword Successfully');
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return !reseted ? (
        <form
            onSubmit={formik.handleSubmit}
            className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow"
        >
            <h2 className="mb-1 text-4xl font-semibold">Reset Password</h2>
            <p className="mb-4 text-gray-600">Please don't forget password again. 🔥</p>
            <div className="mb-1">
                <div className="mb-1 font-medium">New password</div>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    value={formik.values.password}
                    className={clsx('text-input', {
                        invalid: formik.touched.password && formik.errors.password,
                    })}
                    type="password"
                    placeholder="New password"
                />
                <span
                    className={clsx('text-sm text-red-500 opacity-0', {
                        'opacity-100': formik.touched.password && formik.errors.password,
                    })}
                >
                    {formik.errors.password || 'No message'}
                </span>
            </div>

            <div className="mb-3">
                <button
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid || loading}
                    className="btn h-10 w-full"
                >
                    <span className="ml-2">
                        {!loading ? 'Reset Password' : 'Password Reseting'}
                    </span>
                </button>
            </div>

            <div className="flex justify-center">
                <span>Already have an account?</span>
                <Link
                    href="/login"
                    className="ml-2 font-semibold text-primary hover:text-primary-dark"
                >
                    Login now
                </Link>
            </div>
        </form>
    ) : (
        <div className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow">
            <h2 className="mb-1 text-4xl font-semibold">Reset password successfully</h2>
            <p className="mb-4 text-gray-600">Your password has been reset 🍉</p>

            <div className="mb-3">
                <Link className="btn h-10 w-full" href="/login">
                    <span className="ml-2">Login now!</span>
                </Link>
            </div>

            <div className="flex justify-center">
                <span>Not registered yet?</span>
                <Link
                    href="/register"
                    className="ml-2 font-semibold text-primary hover:text-primary-dark"
                >
                    Register now
                </Link>
            </div>
        </div>
    );
}

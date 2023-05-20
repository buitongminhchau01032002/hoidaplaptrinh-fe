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
    email: Yup.string().required('Email required!').email('Email not valid!'),
});

export default function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [comfirmidEmail, setComfirmidEmail] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: handleForgotPassword,
    });

    function handleForgotPassword(values) {
        // setLoading(true);
        setComfirmidEmail(true);
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
                toast.success('ForgotPassword Successfully');
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

    return !comfirmidEmail ? (
        <form
            onSubmit={formik.handleSubmit}
            className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow"
        >
            <h2 className="mb-1 text-4xl font-semibold">Forgot Password</h2>
            <p className="mb-4 text-gray-600">Don't worry! You can reset your password now. 🔥</p>
            <div className="mb-1">
                <div className="mb-1 font-medium">Email</div>
                <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    className={clsx('text-input', {
                        invalid: formik.touched.email && formik.errors.email,
                    })}
                    type="text"
                    placeholder="Email"
                />
                <span
                    className={clsx('text-sm text-red-500 opacity-0', {
                        'opacity-100': formik.touched.email && formik.errors.email,
                    })}
                >
                    {formik.errors.email || 'No message'}
                </span>
            </div>

            <div className="mb-3">
                <button
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid || loading}
                    className="btn h-10 w-full"
                >
                    <span className="ml-2">
                        {!loading ? 'Comfirm email' : 'Sending to you email'}
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
            <h2 className="mb-1 text-4xl font-semibold">Check your email</h2>
            <p className="mb-4 text-gray-600">Check your email to reset password. 🥑</p>

            <div className="mb-3">
                <Link className="btn h-10 w-full" href="/">
                    <span className="ml-2">Back to homepage!</span>
                </Link>
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
        </div>
    );
}

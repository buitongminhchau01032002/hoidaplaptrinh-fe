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
import { API } from '~/constants';

const validationSchema = Yup.object({
    email: Yup.string().required('Email required!').email('Email not valid!'),
    password: Yup.string().required('Password required!'),
});

export default function LoginPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    function handleLogin(values) {
        setLoading(true);
        fetch(`${API}/auth/login`, {
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
                toast.success('Login Successfully');
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

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow"
        >
            <h2 className="mb-1 text-4xl font-semibold">Login</h2>
            <p className="mb-4 text-gray-600">Hi, Welcome back 👋</p>
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
            <div className="mb-1">
                <div className="mb-1 font-medium">Password</div>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    value={formik.values.password}
                    className={clsx('text-input', {
                        invalid: formik.touched.password && formik.errors.password,
                    })}
                    type="password"
                    placeholder="Password"
                />
                <span
                    className={clsx('text-sm text-red-500 opacity-0', {
                        'opacity-100': formik.touched.password && formik.errors.password,
                    })}
                >
                    {formik.errors.password || 'No message'}
                </span>
            </div>
            <div className="mb-3 flex justify-end">
                <Link
                    href="/forgot-password"
                    className="cursor-pointer font-semibold text-primary hover:text-primary-dark"
                >
                    Forgot password?
                </Link>
            </div>

            <div className="mb-3">
                <button
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid || loading}
                    className="btn h-10 w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                    <span className="ml-2">{!loading ? 'Login' : 'Logining'}</span>
                </button>
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
        </form>
    );
}

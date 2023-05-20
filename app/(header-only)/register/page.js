'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import clsx from 'clsx';

const validationSchema = Yup.object({
    email: Yup.string().required('Email required!').email('Email not valid!'),
    password: Yup.string().required('Password required!'),
});

export default function RegisterPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const showSuccessNoti = () => toast.success('Register Successfully');
    const showErorrNoti = () => toast.error('Something went wrong');
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleRegister,
    });

    function handleRegister(values) {
        fetch('http://localhost:8080/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error) {
                    console.log('Đăng ký không thành công');
                    console.log(resBody);
                    // error = resBody.error.message;
                    showErorrNoti();
                    return;
                }

                // const user = resBody.user;
                // user.token = resBody.token;
                // dispatch(userActions.login(user));
                // console.log(user);
                // alert(JSON.stringify(user, null, 2));
                showSuccessNoti();
                // navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow">
            <h2 className="mb-1 text-4xl font-semibold">Register</h2>
            <p className="mb-4 text-gray-600">Hi, Welcome to forum 👋</p>
            <form onSubmit={formik.handleSubmit}>
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

                <div className="mb-3">
                    <button
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid || loading}
                        className="btn h-10 w-full"
                    >
                        <span className="ml-2">{!loading ? 'Register now' : 'Resistering'}</span>
                    </button>
                </div>
            </form>

            <div className="flex justify-center">
                <span>Already have an account?</span>
                <Link
                    href="/register"
                    className="ml-2 font-semibold text-primary hover:text-primary-dark"
                >
                    Login now
                </Link>
            </div>
        </div>
    );
}

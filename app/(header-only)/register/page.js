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
    first_name: Yup.string().required('First Name required!'),
    last_name: Yup.string().required('Last Name required!'),
});

export default function RegisterPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
        },
        validationSchema,
        onSubmit: handleRegister,
    });

    function handleRegister(values) {
        setLoading(true);
        fetch('http://localhost:8080/api/v1/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...values, confirm_password: values.password }),
        })
            .then((res) => res.json())
            .then((resBody) => {
                if (resBody.error_key) {
                    console.log(resBody);
                    toast.error(resBody?.message || 'Something went wrong');
                    return;
                }
                toast.success('Register Successfully');
                setRegistered(true);
            })
            .catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return !registered ? (
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
                <div className="mb-1">
                    <div className="mb-1 font-medium">First Name</div>
                    <input
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="first_name"
                        className={clsx('text-input', {
                            invalid: formik.touched.first_name && formik.errors.first_name,
                        })}
                        type="text"
                        placeholder="First Name"
                    />
                    <span
                        className={clsx('text-sm text-red-500 opacity-0', {
                            'opacity-100': formik.touched.first_name && formik.errors.first_name,
                        })}
                    >
                        {formik.errors.first_name || 'No message'}
                    </span>
                </div>
                <div className="mb-1">
                    <div className="mb-1 font-medium">Last Name</div>
                    <input
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="last_name"
                        className={clsx('text-input', {
                            invalid: formik.touched.last_name && formik.errors.last_name,
                        })}
                        type="text"
                        placeholder="Last Name"
                    />
                    <span
                        className={clsx('text-sm text-red-500 opacity-0', {
                            'opacity-100': formik.touched.last_name && formik.errors.last_name,
                        })}
                    >
                        {formik.errors.last_name || 'No message'}
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
    ) : (
        <div className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow">
            <h2 className="mb-1 text-4xl font-semibold">Check your email!</h2>
            <p className="mb-4 text-gray-600">Check your email to verify account 🍉</p>

            <div className="mb-3">
                <Link className="btn h-10 w-full" href="/">
                    <span className="ml-2">Back to homepage!</span>
                </Link>
            </div>

            <div className="flex justify-center">
                <span>Register another account?</span>
                <button
                    onClick={() => {
                        setRegistered(false);
                        formik.resetForm();
                    }}
                    href="/register"
                    className="ml-2 font-semibold text-primary hover:text-primary-dark"
                >
                    Register now
                </button>
            </div>
        </div>
    );
}

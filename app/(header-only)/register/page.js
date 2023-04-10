import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow">
            <h2 className="mb-1 text-4xl font-semibold">Register</h2>
            <p className="mb-4 text-gray-600">Hi, Welcome to forum 👋</p>
            <div className="mb-3">
                <div className="mb-1 font-medium">Email</div>
                <input className="text-input" type="text" placeholder="Email" />
            </div>
            <div className="mb-5">
                <div className="mb-1 font-medium">Password</div>
                <input className="text-input" type="password" placeholder="Password" />
            </div>

            <div className="mb-3">
                <button className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 font-medium text-white transition hover:bg-primary-dark">
                    <span className="ml-2">Register now</span>
                </button>
            </div>

            <div className="flex justify-center">
                <span>Already have an account?</span>
                <Link href="/login" className="ml-2 font-semibold text-primary hover:text-primary-dark">
                    Login now
                </Link>
            </div>
        </div>
    );
}

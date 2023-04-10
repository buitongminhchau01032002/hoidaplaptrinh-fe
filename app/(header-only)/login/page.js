import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="mx-auto mt-[100px] w-[500px] rounded-lg bg-white p-10 shadow">
            <h2 className="mb-1 text-4xl font-semibold">Login</h2>
            <p className="mb-4 text-gray-600">Hi, Welcome back 👋</p>
            <div className="mb-3">
                <div className="mb-1 font-medium">Email</div>
                <input className="text-input" type="text" placeholder="Email" />
            </div>
            <div className="mb-3">
                <div className="mb-1 font-medium">Password</div>
                <input className="text-input" type="password" placeholder="Password" />
            </div>
            <div className="mb-3 flex justify-end">
                <button className="font-semibold text-primary hover:text-primary-dark">Forgot password?</button>
            </div>

            <div className="mb-3">
                <button className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 font-medium text-white transition hover:bg-primary-dark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
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
                    <span className="ml-2">Login</span>
                </button>
            </div>

            <div className="flex justify-center">
                <span>Not registered yet?</span>
                <Link href="/register" className="ml-2 font-semibold text-primary hover:text-primary-dark">
                    Register now
                </Link>
            </div>
        </div>
    );
}

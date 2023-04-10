import Header from '~/components/Header/Header';

export default function DefaultLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            <main className="mx-auto grid max-w-container grid-cols-3 gap-7 px-7 py-h-header">
                <div className="col-span-2">{children}</div>
                {/* <Sidebar /> */}
                <p>SIDE BAR</p>
            </main>
        </div>
    );
}

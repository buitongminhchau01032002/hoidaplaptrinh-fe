import ManageMenu from './components/ManageMenu';

export default function ManageLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <h2 className="py-10 text-center text-2xl font-bold">MANAGE</h2>
            <main className="mx-auto grid max-w-container grid-cols-3 gap-7 px-7">
                <div className="">
                    <ManageMenu />
                </div>
                <div className="col-span-2">{children}</div>
            </main>
        </div>
    );
}

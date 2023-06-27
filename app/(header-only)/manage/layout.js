import ManageMenu from './components/ManageMenu';

export default function ManageLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <main className="mx-auto grid max-w-container grid-cols-3 gap-7 px-7 py-h-header">
                <div className="">
                    <ManageMenu />
                </div>
                <div className="col-span-2">{children}</div>
            </main>
        </div>
    );
}

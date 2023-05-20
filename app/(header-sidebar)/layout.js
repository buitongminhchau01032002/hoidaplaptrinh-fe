import Header from '~/app/components/Header';
import Sidebar from './components/Sidebar';

export default function DefaultLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            <main className="mx-auto grid max-w-container grid-cols-3 gap-7 px-7 py-h-header">
                <div className="col-span-2">{children}</div>
                <div className="pt-5">
                    <Sidebar />
                </div>
            </main>
        </div>
    );
}

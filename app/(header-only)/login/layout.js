import Header from '~/components/Header/Header';

export default function HeaderOnlyLayout({ children }) {
    return (
        <div className="w-full overflow-x-hidden">
            <Header />
            <main className="mx-auto max-w-container px-7 py-h-header">{children}</main>
        </div>
    );
}

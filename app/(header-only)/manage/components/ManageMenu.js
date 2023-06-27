import clsx from 'clsx';
import Link from 'next/link';

const ITEM = [
    {
        name: 'Posts',
        link: '/post',
    },
    {
        name: 'Topics',
        link: '/topic',
    },
];

export default function ManageMenu() {
    return (
        <div className="bg-white">
            {ITEM.map((item, index) => (
                <Link
                    className={clsx('block border-b p-3 font-semibold')}
                    key={index}
                    href={'/manage' + item.link}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
}

import SideNav from '../../components/sidenav';
import IMG from '../../components/acme-logo';
import Breadcrumbs from '../../components/breadcrumbs';
import Link from 'next/link';

export default function Layout({ children }) {
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Product Details', href: '/products/details', active: true },
    ];

    return (
        <div className="flex h-screen flex-col">
            {/* Top Header */}
            <header className="bg-gray-100 p-4 text-white flex items-center justify-between">
                {/* Logo */}
                <div>
                    <IMG />
                </div>
                {/* Navigation links */}
                <nav className="flex space-x-4">
                    <Link href="/" passHref>
                        <div className="text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer">
                            Home
                        </div>
                    </Link>
                    <Link href="/about" passHref>
                        <div className="text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer">
                            About
                        </div>
                    </Link>
                    {/* Add more navigation links using Link component as needed */}
                </nav>
            </header>
            {/* Main Content */}
            <div className="flex flex-1 md:flex-row md:overflow-hidden">
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    <div className="mb-6 flex justify-between">
                        <div></div>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    {children}
                </div>{' '}
            </div>
        </div>
    );
}

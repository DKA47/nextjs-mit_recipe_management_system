// components/TopNav.tsx

const TopNav = () => {
    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <a href="/" className="text-white font-bold">
                            Your Logo
                        </a>
                    </div>
                    {/* Navigation links */}
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            <a
                                href="/"
                                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </a>
                            <a
                                href="/about"
                                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                About
                            </a>
                            {/* Add more navigation links as needed */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;

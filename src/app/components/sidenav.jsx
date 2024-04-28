"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavLinks from '../components/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = () => {
    // Redirect the user to the login page
    router.push('../login');
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-800 md:block"></div>
        {/* Removed the form element */}
        <button
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-white text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          onClick={handleSignOut} // Call handleSignOut when the button is clicked
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
        {/* End of button */}
      </div>
    </div>
  );
}

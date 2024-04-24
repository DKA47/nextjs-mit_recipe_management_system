import SideNav from '../../components/sidenav';
import IMG from '../../components/acme-logo';
import Breadcrumbs from '../../components/breadcrumbs';


export default function Layout({ children }) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Product Details', href: '/products/details', active: true },
  ];

  return (
    <div className="flex h-screen flex-col">
      {/* Top Header */}
      <header className="bg-gray-100 p-4 text-white">
        {/* Header content goes here */}
        <IMG />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          <div className="mb-6 flex justify-between">
            {/* Breadcrumbs float right */}
            <div></div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          {children}
        </div>{' '}
      </div>
    </div>
  );
}

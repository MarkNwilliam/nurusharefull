import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
    { name: 'Notes', href: '/Notes' },
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'About', href: '/aboutus' }, //changed from '/About'
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    // Delete the token from localStorage
    localStorage.removeItem('token');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <header className="p-6 bg-gray-800 text-center sm:flex sm:justify-between sm:px-10">
        <div className="mb-4 sm:mb-0 flex justify-between items-center">
          <Link to="/">
            <img
              className="h-8 w-auto"
              src="nurushare.webp"
              alt="NuruShare Logo"
            />
          </Link>
          <button
            className="lg:hidden rounded p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 text-yellow-300" aria-hidden="true" />
          </button>
        </div>

        <nav className="hidden lg:flex space-x-10">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-yellow-300 text-lg hover:text-yellow-500">
              {item.name}
            </Link>
          ))}
          {isLoggedIn && (
            <Link to="/upload" className="text-yellow-300 text-lg hover:text-yellow-500">
              Upload Notes
            </Link>
          )}
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="text-yellow-300 text-lg hover:text-yellow-500">
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="text-yellow-300 text-lg hover:text-yellow-500">
              Sign In
            </Link>
          )}
        </nav>
      </header>

      <Dialog as="div" className="fixed inset-0 z-10" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-y-0 right-0 w-full max-w-md bg-gray-800">
          <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
              <img
                className="h-8 w-auto"
                src="nurushare.webp"
                alt="NuruShare Logo"
              />
              <button
                className="rounded p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-yellow-300" aria-hidden="true" />
              </button>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md text-lg text-yellow-300 hover:bg-gray-700"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn && (
              <Link to="/upload" className="block px-3 py-2 rounded-md text-lg text-yellow-300 hover:bg-gray-700">
                Upload Notes
              </Link>
            )}
            {isLoggedIn ? (
              <button onClick={handleSignOut} className="block px-3 py-2 rounded-md text-lg text-yellow-300 hover:bg-gray-700">
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-lg text-yellow-300 hover:bg-gray-700">
                Sign In
              </Link>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

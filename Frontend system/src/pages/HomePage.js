import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import animationData from '../animations/143472-mapping-for-machine-learning.json';
import Lottie from 'react-lottie';
import Footer from '../component/Footer';

const navigation = [
  { name: 'Notes', href: '/Notes' },
  { name: 'Home', href: '/' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'About', href: '/aboutus' },
];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-yellow-300">
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
              <Bars3Icon
                className="h-6 w-6 text-yellow-300"
                aria-hidden="true"
              />
            </button>
          </div>

          <nav className="hidden lg:flex space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-yellow-300 text-lg hover:text-yellow-500"
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn && (
              <Link
                to="/signup"
                className="text-yellow-300 text-lg hover:text-yellow-500"
              >
                Sign Up
              </Link>
            )}
          </nav>
        </header>

        <Dialog
          as="div"
          className="fixed inset-0 z-10"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
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
                  <XMarkIcon
                    className="h-6 w-6 text-yellow-300"
                    aria-hidden="true"
                  />
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
              {!isLoggedIn && (
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-lg text-yellow-300 hover:bg-gray-700"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </Dialog.Panel>
        </Dialog>

        <main className="flex flex-col items-center justify-center flex-grow text-center mt-16 p-10">
          <h1 className="text-4xl font-semibold mb-4">
            Share your Knowledge with the world
          </h1>

          <Lottie options={defaultOptions} height={400} width={400} />

          <p className="text-xl text-yellow-200">
            Providing you with high-quality notes from other students that empower your studies and help you reach your goals.
          </p>
          <div className="flex space-x-4 mt-10">
            <Link
              to="#"
              className="bg-yellow-500 px-6 py-3 rounded text-yellow-900 text-lg hover:bg-yellow-400"
            >
              Get Started
            </Link>
            <Link
              to="#"
              className="bg-gray-800 px-6 py-3 rounded text-yellow-300 text-lg hover:bg-gray-700"
            >
              Learn More
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

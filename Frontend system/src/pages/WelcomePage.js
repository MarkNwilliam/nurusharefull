import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';
import Header from '../component/Header';

const WelcomePage = () => {
  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md text-yellow-300">
        <h2 className="text-2xl font-semibold mb-6">Welcome!</h2>
        <p className="mb-6 text-center">
          Thank you for signing up. You are now a registered member.
        </p>
        <Link to="/login" className="w-full bg-yellow-500 text-gray-800 py-2 px-4 rounded hover:bg-yellow-400">
          Log In
        </Link>
        <div className="mt-6 text-center">
          <Link to="/upload" className="bg-yellow-500 text-gray-800 py-1 px-2 rounded hover:bg-yellow-400">
            Upload Notes
          </Link>
        </div>
      </div>
     
    </div>
    <Footer/>
    </>
  );
};

export default WelcomePage;

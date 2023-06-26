import React from 'react';
import Header from '../component/Header';
import animationData from '../animations/92377-quiz-mode.json';
import Lottie from 'react-lottie';
import Footer from '../component/Footer';

function MarketPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-900 text-yellow-300">
    <Header />
    
    <main className="flex flex-col items-center justify-center flex-grow text-center mt-16 p-10">
      <h1 className="text-4xl font-semibold mb-4">NuruShare Marketplace</h1>

      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src="nurushare.webp" alt="NuruShare"/>
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-yellow-500 font-semibold">NuruNet</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-yellow-300 hover:underline">Study with a WhatsApp chatbot.</p>
            <p className="mt-2 text-yellow-200 mb-5">Get an advanced AI to help you breakdown advanced concepts using analogies and stories.</p>
            <a href="https://wa.me/256750839750?text=Hi," className="mt-5 px-5 py-3 rounded text-yellow-900 bg-yellow-500 hover:bg-yellow-400">GET NOW</a>
          </div>
        </div>
      </div>
    </main>
  </div>
  <Footer />    
  </>
  );
}

export default MarketPage;


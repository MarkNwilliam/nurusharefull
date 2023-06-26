import React from 'react';
import Header from '../component/Header';
import animationData from '../animations/92377-quiz-mode.json';
import Lottie from 'react-lottie';
import Footer from '../component/Footer';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-yellow-300">
      <Header />
      
      <main className="flex flex-col items-center justify-center flex-grow text-center mt-16 p-10">
        <h1 className="text-4xl font-semibold mb-4">About Us</h1>

        <Lottie options={defaultOptions} height={400} width={400} />

        <p className="text-xl text-yellow-200">
          At NuruShare, we believe in the power of shared knowledge. Our platform brings students together from all over the world to share their study notes and resources. We strive to create a collaborative learning community where students can empower each other to reach their academic goals. With high-quality notes and resources readily available, NuruShare is your partner in academic success.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;

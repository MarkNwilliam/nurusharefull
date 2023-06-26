import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import UploadPage from './pages/UploadPage';
import Notes from './pages/Notes';
import React from 'react';
import AboutPage from './pages/AboutPage';
import MarketPage from './pages/Marketplace';
import NoteView from './pages/NoteView'; 
import TokenRefresh from './component/TokenRefresh';
function App() {
  return (
    <div className="App">
     <div>
     <TokenRefresh />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/marketplace" element={<MarketPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:_id" element={<NoteView />} />

      </Routes>
    </div>
    </div>
  );
}

export default App;


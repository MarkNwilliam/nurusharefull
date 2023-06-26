import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';
import requireAuth from '../component/requireAuth';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Notes', href: '/Notes' },
  { name: 'Marketplace', href: '/Marketplace' },
  { name: 'About', href: '/aboutus' },
];

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const defaultImage = '/nurushare.webp';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://nurushare.azurewebsites.net/notes');
        setNotes(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotes();
  }, []);

  const handleOpen = (note) => {
    navigate(`/notes/${encodeURIComponent(note._id)}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.topic.toLowerCase().includes(search.toLowerCase())
  );

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
            <button className="lg:hidden rounded p-2">
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
            {isLoggedIn && (
              <Link
                to="/upload"
                className="text-yellow-300 text-lg hover:text-yellow-500"
              >
                Upload Notes
              </Link>
            )}
          </nav>
        </header>

        <main className="flex flex-col items-center justify-center flex-grow text-center mt-16 p-10">
          <h1 className="text-4xl font-semibold mb-4">Notes</h1>
          <input
            type="search"
            placeholder="Search by topic"
            value={search}
            onChange={handleSearch}
            className="w-full max-w-lg px-3 py-2 bg-gray-800 rounded-md text-yellow-300"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                onClick={() => handleOpen(note)}
              >
                <div className="relative w-40 h-56 mx-auto">
                  <img
                    className="object-cover w-full h-full"
                    src={note.imageURL || defaultImage}
                    alt="Note Image"
                  />
                  {!note.imageURL && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                      <p className="text-yellow-300">No Image</p>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-medium text-yellow-300 mb-4">
                  {note.title}
                </h2>
                <h3 className="text-lg text-yellow-200">Topic: {note.topic}</h3>
                <p className="text-yellow-200 mt-2">
                  Uploaded by: {note.uploader}
                </p>
                <p className="text-yellow-200">
                  Date: {new Date(note.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default requireAuth(Notes);

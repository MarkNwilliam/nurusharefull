import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [uploader, setUploader] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.includes('image')) {
      setImage(file);
    } else {
      setFile(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !image) {
      Swal.fire('Error', 'Please select both a file and an image', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('image', image);
    formData.append('title', title);
    formData.append('topic', topic);
    formData.append('description', description);
    formData.append('uploader', uploader);

    try {
      const response = await axios.post('https://nurushare.azurewebsites.net/upload', formData);
      Swal.fire('Success', response.data.message, 'success');
      navigate('/notes');
    } catch (err) {
      Swal.fire('Error', 'Error uploading file, image, and saving note', 'error');
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md text-yellow-300">
          <h2 className="text-2xl font-semibold mb-6">Upload Notes</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="topic">
                Topic
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="uploader">
                Uploader's Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="uploader"
                type="text"
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
              />
            </div>

            <div {...getRootProps()} className="dropzone mb-6 text-center py-6 border-dashed border-4 border-gray-500">
              <input {...getInputProps()} />
              {file ? (
                <p>{file.name}</p>
              ) : (
                <p>Drag 'n' drop a note file here, or click to select a note file</p>
              )}
            </div>

            <div {...getRootProps()} className="dropzone mb-6 text-center py-6 border-dashed border-4 border-gray-500">
              <input {...getInputProps()} />
              {image ? (
                <p>{image.name}</p>
              ) : (
                <p>Drag 'n' drop an image here, or click to select an image</p>
              )}
            </div>

            <button className="w-full bg-yellow-500 text-gray-800 py-2 px-4 rounded hover:bg-yellow-400" type="submit">
              Upload Notes
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="bg-yellow-500 text-gray-800 py-1 px-2 rounded hover:bg-yellow-400">
              Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadPage;

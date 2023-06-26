import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Link, useParams } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const NoteView = () => {
  const [note, setNote] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const { _id } = useParams(); // Use useParams hook to access the id parameter

  const url = `https://nurushare.azurewebsites.net/getdoc/${_id}`;
  console.log("Fetching note from URL: ", url);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(url);
        setNote(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNote();
  }, [_id]);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-300">
      <header className="p-6 bg-gray-800 text-center sm:flex sm:justify-between sm:px-10">
        <div className="mb-4 sm:mb-0">
          <Link to="/Notes">
            <XMarkIcon className="h-6 w-6 text-yellow-300" aria-hidden="true" />
          </Link>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">{note ? note.title : "Loading..."}</h1>
        </div>
      </header>

      <div className="flex justify-center items-center h-full">
        {note ? (
          // Render the note content here
          <Document file={note.fileURL} onLoadSuccess={onLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : (
          // Render a loading state or error message here
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NoteView;

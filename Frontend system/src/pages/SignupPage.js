import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../component/Header';
import Footer from '../component/Footer';

const SignupPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });


  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });

    if (!e.target.value) {
      setFormErrors({
        ...formErrors,
        [e.target.id]: `${e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)} is required`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [e.target.id]: '',
      });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://nurushare.azurewebsites.net/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
  
      const data = await response.json();
  
      if (response.ok) {
         // Store the token in local storage
  localStorage.setItem('token', response.data.token);
  
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User registered successfully',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/welcome');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Registration failed',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An unexpected error happened',
      });
    }
  };

  

  return (
    <>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
         <Link to="/" className="bg-yellow-500 text-gray-800 py-1 px-2 rounded hover:bg-yellow-400">
            Home
          </Link>
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md text-yellow-300">
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block">Name:</label>
            <input type="text" id="name" className="form-input mt-1 text-yellow-300 bg-gray-900 w-full px-2 py-1 border-yellow-500 border" onChange={handleChange} />
            {formErrors.name && <p className="text-red-600">{formErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email:</label>
            <input type="email" id="email" className="form-input mt-1 text-yellow-300 bg-gray-900 w-full px-2 py-1 border-yellow-500 border" onChange={handleChange} />
            {formErrors.email && <p className="text-red-600">{formErrors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block">Password:</label>
            <input type="password" id="password" className="form-input mt-1 text-yellow-300 bg-gray-900 w-full px-2 py-1 border-yellow-500 border" onChange={handleChange} />
            {formErrors.password && <p className="text-red-600">{formErrors.password}</p>}
          </div>
          <button type="submit" onClick={handleSubmit} className="w-full bg-yellow-500 text-gray-800 py-2 px-4 rounded hover:bg-yellow-400">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          I agree to the 
          <Link to="/terms" className="text-yellow-500 hover:text-yellow-700 underline ml-1 mr-1">Terms and Conditions</Link> 
          and 
          <Link to="/privacy" className="text-yellow-500 hover:text-yellow-700 underline ml-1 mr-1">Privacy Policy</Link>
        </p>
        <div className="mt-6 text-center">
          Already have an account? 
          <Link to="/login" className="text-yellow-500 hover:text-yellow-700 underline ml-1">Log in</Link>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default SignupPage;


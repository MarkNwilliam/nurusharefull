import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../component/Header';
import Footer from '../component/Footer';

const LoginPage = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://nurushare.azurewebsites.net/login', formState);

      if (response.data.success) {
         // Store the token in local storage
         localStorage.setItem('token', response.data.token);
        Swal.fire('Login Success!', response.data.message, 'success');
        navigate('/welcome');
      } else {
        Swal.fire('Login Error!', response.data.message, 'error');
      }
    } catch (error) {
      Swal.fire('Login Error!', 'An error occurred. Please try again.', 'error');
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
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        
         
        
        <form onSubmit={handleSubmit} >
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
          <button type="submit" className="w-full bg-yellow-500 text-gray-800 py-2 px-4 rounded hover:bg-yellow-400">
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          Don't have an account? 
          <Link to="/signup" className="text-yellow-500 hover:text-yellow-700 underline ml-1">Sign Up</Link>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default LoginPage;

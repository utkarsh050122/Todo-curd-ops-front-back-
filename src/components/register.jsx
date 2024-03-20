import { useState } from "react";
//import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [data, setData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

       fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      // const responseData = await response.json();
      // console.log(responseData.message);
      navigate('/login'); // Navigate to login page upon successful registration
    }) 
    .catch (error=> console.error('Error:', error))
      // const errorData = await response.json();
      // throw new Error(error.message);
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
        <div>
  <label htmlFor="first-name" className="sr-only">First Name</label>
  <input
    id="first-name"
    name="f_name" // Ensure this matches the state property name
    type="text"
    autoComplete="given-name" // Standard value for first name
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="First Name"
    onChange={handleChange}
    value={data.f_name}
  />
</div>

<div>
  <label htmlFor="last-name" className="sr-only">Last Name</label>
  <input
    id="last-name"
    name="l_name" // Match this with the state property name
    type="text"
    autoComplete="family-name" // Standard value for last name
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="Last Name"
    onChange={handleChange}
    value={data.l_name}
  />
</div>

          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <div>
       {/* <label htmlFor="passwordConfirm" className="sr-only">Confirm Password</label>
        <input
          id="passwordConfirm" // Unique ID
          name="passwordConfirm" // Corrected name attribute, matching the state property
          type="password"
          autoComplete="new-password" // Changed to "new-password" for the confirm password field
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={data.passwordConfirm} */}
      {/* /> */}
</div>

        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Signup;
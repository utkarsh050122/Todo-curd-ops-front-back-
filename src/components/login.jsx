import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const url = "http://localhost:4000/auth/login";
          const { data: res } = await axios.post(url, data);
          localStorage.setItem("token", res.token); // Assuming the token is in the response
          navigate('/'); // Navigate to the home page or dashboard
      } catch (error) {
          if (error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500) {
              setError(error.response.data.message);
          }
      }
  };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="flex flex-wrap justify-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Login to Your Account</h1>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <h1 className="text-gray-700 text-md">New Here?</h1>
          <Link to="/signup">
            <button
              type="button"
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
    )
  };
  
  export default Login;
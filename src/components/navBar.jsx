import React from 'react';


import { Link,useNavigate } from 'react-router-dom';

function NavBar() {
    let navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login'); // Navigate to the login page after logout
    };



    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="font-bold">pic</div>
            <div className="flex items-center">
                {/* Use Link components for navigation */}
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                
                    Login
                </Link>
                <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                
                    Signup
                </Link>
                <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition duration-200 ease-in-out" onClick={handleLogout}>
                   Logout
                </button>
            </div>
        </nav>
    );
}

    // return (
    //     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
    //         <div className="font-bold">pic</div>
    //         <div className="flex items-center">
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
    //                 Login
    //             </button>
    //             <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    //                 Signup
    //             </button>
    //             <nav className="p-5 bg-blue-500 text-white w-full flex justify-between items-center">
    //             <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition duration-200 ease-in-out" onClick={handleLogout}>
    //                Logout
    //             </button>
    //         </nav>
    //         </div>
    //     </nav>
    // );

export default NavBar;

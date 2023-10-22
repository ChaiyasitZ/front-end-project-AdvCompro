import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const Error404 = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-medium text-gray-600">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="mt-4 px-4 py-2 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
                >
                    Go back to home
                </Link>
            </div>
        </>
    );
};

export default Error404;

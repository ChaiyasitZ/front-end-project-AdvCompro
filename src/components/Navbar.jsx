import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const pathname = location.pathname.split("/")[1];

    return (
        <div className="px-4 md:px-12 py-3 shadow-md flex flex-row items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-gray-800">Todo App</Link>
            <div className="flex-grow"></div>
            <Link to="/category" className={"hover:text-gray-600 " + (pathname == "category" ? "text-purple-800" : "text-gray-800")}>Category</Link>
        </div>
    )
}
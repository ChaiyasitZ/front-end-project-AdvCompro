import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full mx-auto">
                <div className="animate-pulse flex flex-col space-y-4 items-center">
                    <div className="h-4 bg-gray-400 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded-lg w-5/6"></div>
                    <div className="h-4 bg-gray-400 rounded-lg w-4/5"></div>
                    <div className="h-4 bg-gray-400 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-400 rounded-lg w-4/5"></div>
                    <div className="h-4 bg-gray-400 rounded-lg w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;

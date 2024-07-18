import React from "react";

export const ServerError = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-lg w-full sm:w-[300px] mx-auto mt-10">
      <div className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-600 mb-2">Server Error</h1>
      <p className="text-md text-gray-700 mb-4">
        We're sorry, something went wrong. Please try again later.
      </p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
};

export default ServerError;

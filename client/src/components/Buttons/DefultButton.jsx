import React from 'react';

const DefultButton = ({ text = 'Click Me', onClick, btntype }) => {
    return (
        <button
            type={btntype}
            onClick={onClick}
            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 rounded-full shadow-xl hover:from-cyan-500 hover:to-blue-700 hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
            <span className="z-10">{text}</span>
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-full"></div>
        </button>
    );
};

export default DefultButton;

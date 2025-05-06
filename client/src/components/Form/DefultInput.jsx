import React from 'react';

const DefultInput = ({ label, type, name, value, onChange, placeholder, required = false }) => {
    return (
        <div className="mb-6">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700 placeholder:text-gray-400"
            />
        </div>
    );
};

export default DefultInput;

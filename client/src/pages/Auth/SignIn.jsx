import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefultButton from '../../components/Buttons/DefultButton';
import DefultInput from '../../components/Form/DefultInput';
import Dropdown from '../../components/Form/Dropdown';
import axios from 'axios';
import { MdOutlineClose } from "react-icons/md";


const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/auth/signup', formData);
            if (res.data.Status === "Success") {
                setErrorMsg({ type: "success", message: res.data.Message });
            } else {
                setErrorMsg({ type: "error", message: res.data.Error });
            }
        } catch (err) {
            setErrorMsg({ type: "error", message: "Internal Server Error" });
            console.log(err);
        }
    };


    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

            {errorMsg && (
                <div
                    className={`${errorMsg.type === 'error' ? 'text-red-600 bg-red-300/20' : 'text-green-600 bg-green-300/20'
                        } p-4 rounded-xl mb-4 transition-all duration-300 ease-in-out transform`}
                    style={{ transform: errorMsg ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.5s ease-out' }}
                >
                    <div className="flex justify-between">
                        <div className="flex">
                            <p className="font-bold">{errorMsg.type === 'error' ? 'Error :' : 'Success :'}</p>
                            <p className="pl-2">{errorMsg.message}</p>
                        </div>
                        <div className="mt-0">
                            <MdOutlineClose className='h-6 w-auto cursor-pointer' onClick={() => setErrorMsg(null)} />
                        </div>
                    </div>
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <DefultInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
                <DefultInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
                <div className="text-center mt-6">
                    <DefultButton text="Login" btntype="submit" />
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                    Create one
                </Link>
            </p>
        </div>
    );
};

export default SignIn;

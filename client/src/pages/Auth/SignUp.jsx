import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefultButton from '../../components/Buttons/DefultButton';
import DefultInput from '../../components/Form/DefultInput';
import Dropdown from '../../components/Form/Dropdown';
import axios from 'axios';
import { MdOutlineClose } from "react-icons/md";
import secureLocalStorage from 'react-secure-storage';


const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        faculty: '',
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
                secureLocalStorage.setItem('email', formData.email)
                setTimeout(() => {
                    navigate('/VerifyOTP', { replace: true });
                }, 2000);
            } else {
                setErrorMsg({ type: "error", message: res.data.Error });
            }
        } catch (err) {
            setErrorMsg({ type: "error", message: "Internal Server Error" });
            console.log(err);
        }
    };

    const facultyOptions = [
        { label: 'Faculty of Agriculture', value: 'Faculty of Agriculture' },
        { label: 'Faculty of Allied Health Sciences', value: 'Faculty of Allied Health Sciences' },
        { label: 'Faculty of Arts', value: 'Faculty of Arts' },
        { label: 'Faculty of Dental Sciences', value: 'Faculty of Dental Sciences' },
        { label: 'Faculty of Engineering', value: 'Faculty of Engineering' },
        { label: 'Faculty of Management', value: 'Faculty of Management' },
        { label: 'Faculty of Medicine', value: 'Faculty of Medicine' },
        { label: 'Faculty of Science', value: 'Faculty of Science' },
        { label: 'Faculty of Veterinary Medicine and Animal Science', value: 'Faculty of Veterinary Medicine and Animal Science' },
        { label: 'Postgraduate Institute of Humanities and Social Sciences (PGIHS)', value: 'Postgraduate Institute of Humanities and Social Sciences (PGIHS)' },
        { label: 'Postgraduate Institute of Agriculture (PGIA)', value: 'Postgraduate Institute of Agriculture (PGIA)' },
        { label: 'ICT Center', value: 'ICT Center' },
        { label: 'Administration', value: 'Administration' }
    ];
    

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>

            {errorMsg && (
                <div
                    className={`${
                        errorMsg.type === 'error' ? 'text-red-600 bg-red-300/20' : 'text-green-600 bg-green-300/20'
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
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                />
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
                    placeholder="Create a password"
                    required
                />
                <Dropdown
                    label="Faculty"
                    name="faculty"
                    onChange={handleChange}
                    required
                    options={facultyOptions}
                />
                <div className="text-center mt-6">
                    <DefultButton text="Register" btntype="submit" />
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/" className="text-blue-600 hover:underline font-semibold">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUp;

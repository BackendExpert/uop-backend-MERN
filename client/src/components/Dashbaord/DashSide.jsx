import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { dashsidedata } from './DashSideMenu';
import uoplogo from '../../assets/uoplogo.png'

const DashSide = () => {
    const [activeMenu, setActiveMenu] = useState(1);
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');

    useEffect(() => {
        const savedMenu = localStorage.getItem('dashmenuID');
        if (savedMenu) setActiveMenu(savedMenu);
    }, []);

    const handleMenuClick = (id) => {
        localStorage.setItem('dashmenuID', id);
        setActiveMenu(id);
    };

    return (
        <div className="bg-white text-slate-800 min-h-screen p-6 shadow-md xl:rounded-r-3xl border-r border-gray-200
                overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 hover:scrollbar-thumb-blue-600 transition-all duration-300">

            <div className="text-center mb-6">
                {/* <h1 className="text-3xl font-extrabold text-sky-500 tracking-wide">UniExam Pro</h1> */}
                <img src={uoplogo} alt="" />
            </div>

            <div className="flex items-center mb-6 p-4 bg-sky-100 text-sky-700 rounded-2xl shadow-inner">
                <img
                    src="https://avatars.githubusercontent.com/u/138636749?v=4"
                    alt="User"
                    className="h-12 w-12 rounded-full border-2 border-sky-400 shadow"
                />
                <div className="ml-4">
                    <h1 className="text-base font-semibold uppercase">{username}</h1>
                    <p className="text-xs uppercase text-sky-500">{role}</p>
                </div>
            </div>

            <div className="space-y-2">
                {dashsidedata.map((data, index) => (
                    <Link to={data.link} key={index} className="block">
                        <div
                            onClick={() => handleMenuClick(data.id)}
                            className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out cursor-pointer
                    ${activeMenu === data.id
                                    ? 'bg-sky-400 text-white font-semibold shadow-md'
                                    : 'hover:bg-sky-100 hover:text-sky-700 text-slate-700'}`}
                        >
                            <data.icon className="h-5 w-5" />
                            <span className="text-sm">{data.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default DashSide;

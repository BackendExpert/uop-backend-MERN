import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import secureLocalStorage from 'react-secure-storage';

const DashNav = () => {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null);
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');

    const toggleMenu = () => setMenu(!menu);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        const handler = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm py-4 px-6 rounded-b-2xl">
            <div className="flex justify-between items-center">
                <div className="text-xl font-bold tracking-wide text-emerald-600">Dashboard</div>

                <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer" onClick={toggleMenu}>
                        <img
                            src="https://avatars.githubusercontent.com/u/138636749?v=4"
                            alt="profile"
                            className="h-10 w-10 rounded-full border-2 border-emerald-300 shadow"
                        />
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
                    </div>

                    {menu && (
                        <div
                            ref={menuRef}
                            className="absolute right-6 top-16 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50"
                        >
                            <div className="flex items-center gap-4 p-4 border-b border-gray-100">
                                <img
                                    src="https://avatars.githubusercontent.com/u/138636749?v=4"
                                    alt="User"
                                    className="h-10 w-10 rounded-full border"
                                />
                                <div>
                                    <h1 className="font-semibold text-slate-800">{username}</h1>
                                    <p className="text-xs text-gray-500">{role}</p>
                                </div>
                            </div>

                            <div className="p-2 space-y-1">
                                <DropdownItem icon={<FaUser />} label="My Profile" />
                                <DropdownItem icon={<FaCog />} label="Settings" />
                                <DropdownItem icon={<FaQuestionCircle />} label="FAQ" />
                                <div onClick={handleLogout}>
                                    <DropdownItem icon={<FaSignOutAlt />} label="Log Out" isLogout />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

const DropdownItem = ({ icon, label, badge, isLogout }) => {
    return (
        <div
            className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition
            ${isLogout
                    ? 'text-red-600 hover:bg-red-50'
                    : 'hover:bg-[#e5bc11]/10 text-[#4a2d11]'}`}
        >
            <div className="flex items-center gap-3">
                <span className="text-base">{icon}</span>
                <span>{label}</span>
            </div>
            {badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>
            )}
        </div>
    );
};

export default DashNav;

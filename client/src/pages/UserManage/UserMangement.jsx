import React, { useEffect } from 'react'
import { FaUsers } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage'
import AllUsers from './AllUsers';

const UserMangement = () => {
    const navigate = useNavigate()
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    const email = secureLocalStorage.getItem('loginE');

    if (role === 'dvc' || role === 'admin') {
        return (
            <div>
                <div className="flex">
                    <FaUsers className='fill-blue-600 h-8 w-auto'/>
                    <h1 className="text-blue-500 font-semibold uppercase text-xl pl-4 pt-1">User Management</h1>
                </div>

                <div className="mt-8">
                    <AllUsers />
                </div>
            </div>
        )
    }
    else {
        useEffect(() => {
            localStorage.clear()
            navigate('/', { replace: true })
        }, [])
    }

}

export default UserMangement
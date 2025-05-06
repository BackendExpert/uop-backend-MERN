import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import useRoleGuard from '../../hooks/useRoleGuard';
import PageUpperContent from '../../components/DashPages/PageUpperContent';
import { FaUserPen } from "react-icons/fa6";
import axios from 'axios';
import Dropdown from '../../components/Form/Dropdown';
import DefultButton from '../../components/Buttons/DefultButton';



const UpdateUser = () => {
    const navigate = useNavigate()
    const email = secureLocalStorage.getItem('loginE');
    const isAllowed = useRoleGuard(['dvc', 'admin'])
    if (!isAllowed) return null

    const { updateemail } = useParams()

    const [userdata, setuserdata] = useState([])
    const token = localStorage.getItem('login')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/user/allusers', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setuserdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const [updaterole, setupdaterole] = useState({
        role: ''
    })

    const userroles = [
        { label: 'DVC', value: 'dvc' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ];

    const handleChange = (e) => {
        setupdaterole({ ...updaterole, [e.target.name]: e.target.value });
    };


    const headleSubmit = async (e) => {
        try {
            const res = await axios.patch(import.meta.env.VITE_APP_API + '/user/changeUserRole/' + updateemail, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(res => {
                if(res.data.Status === "Success"){
                    alert(res.data.Message)
                    navigate('/Dashboard/UserManagement')
                    window.location.reload()
                }
                else{
                    alert(res.data.Error)
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <PageUpperContent title={updateemail} icon={FaUserPen} />

            <div className="mt-4">
                <a href="/Dashboard/UserManagement" className='rounded-lg bg-blue-500 text-white px-4 py-2 text-white'>
                    Back
                </a>
            </div>

            <div className="mt-6">
                <div className="mt-6">
                    {userdata.length > 0 ? (
                        userdata
                            .filter(user => user.email === updateemail)
                            .map((user, index) => (
                                <div key={index} className="p-5 bg-white rounded-xl shadow-md border border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{user.username}</h3>
                                    <p className="text-sm text-gray-500 mb-1"><span className="font-medium text-gray-700">Email:</span> {user.email}</p>
                                    <p className="text-sm text-gray-500 mb-1"><span className="font-medium text-gray-700">Role:</span> {user.role}</p>
                                    <p className="text-sm">
                                        <span className="font-medium text-gray-700">Status:</span>
                                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold 
                                            ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </p>
                                </div>

                            ))
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>

            </div>


            <div className="mt-4 p-5 bg-white rounded-xl shadow-md border border-gray-200">
                <form onSubmit={headleSubmit} method="post">
                    <Dropdown
                        label="User Type (Role)"
                        name="role"
                        onChange={handleChange}
                        required
                        options={userroles}
                    />

                    <DefultButton text="Update User" btntype="submit" />
                </form>
            </div>

        </div>
    )
}

export default UpdateUser
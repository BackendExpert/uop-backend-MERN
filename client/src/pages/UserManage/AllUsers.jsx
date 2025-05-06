import React, { useEffect, useState } from 'react'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage';
import { Link, useNavigate } from 'react-router-dom';

const AllUsers = () => {
    const navigate = useNavigate()
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    const email = secureLocalStorage.getItem('loginE');
    const token = localStorage.getItem('login')

    const [userdata, setuserdata] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 10;

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/user/allusers', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setuserdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const toggleAccountActive = async (value) => {
        try {
            const res = await axios.patch(import.meta.env.VITE_APP_API + `/user/updateUserStatus/${value}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.data.Status === 'Success') {
                alert(res.data.Message)
                window.location.reload()
            } else {
                alert(res.data.Error)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const filteredUsers = userdata.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    return (
        <div className='bg-white p-6 rounded-xl shadow-lg'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-600">All Users</h2>
                <input
                    type="text"
                    placeholder="Search by username or email..."
                    className="border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className='bg-blue-50 text-blue-600 uppercase tracking-wide text-xs font-semibold border-b'>
                            <th className="p-3">#</th>
                            <th className="p-3">Username</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Faculty</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Verify Email</th>
                            <th className="p-3">Account</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((data, index) => (
                            <tr key={index} className='border-b hover:bg-blue-50'>
                                <td className="p-3 font-medium text-blue-600">{(currentPage - 1) * usersPerPage + index + 1}</td>
                                <td className="p-3">{data.username}</td>
                                <td className="p-3">{data.email}</td>
                                <td className="p-3">{data.faculty}</td>
                                <td className="p-3 uppercase text-sm font-semibold text-blue-600">{data.role}</td>
                                <td className="p-3">
                                    {data.emailVerfy ? (
                                        <span className="text-green-600 font-medium">Verified</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">Not Verified</span>
                                    )}
                                </td>
                                <td className="p-3">
                                    {data.isActive ? (
                                        <span className="text-green-600 font-medium">Active</span>
                                    ) : (
                                        <span className="text-red-500 font-medium">Inactive</span>
                                    )}
                                </td>
                                <td className="p-3 space-x-2 flex items-center">
                                    {data.email === email ? (
                                        <span className="text-gray-400 text-sm">Current User</span>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => toggleAccountActive(data.email)}
                                                className={`px-3 py-1 rounded-full border text-sm font-medium transition ${data.isActive
                                                        ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
                                                        : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                                                    }`}
                                            >
                                                {data.isActive ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <Link to={`/Dashboard/UpdateUser/${data.email}`}>
                                                <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                                                    More
                                                </button>
                                            </Link>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-4 space-x-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1 border rounded-lg hover:bg-blue-100"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className="px-3 py-1 border rounded-lg hover:bg-blue-100"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AllUsers

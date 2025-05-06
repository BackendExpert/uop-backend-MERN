import React from 'react'

const AllUsers = () => {
  return (
    <div className='bg-white p-8 rounded-xl shadow-xl'>
        <table className="w-full">
            <thead>
                <tr className='h-12 border-b border-blue-200 uppercase text-blue-500'>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Faculty</th>
                    <th>Verify Email</th>
                    <th>Active Account</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </div>
  )
}

export default AllUsers
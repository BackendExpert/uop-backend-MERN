import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import useRoleGuard from '../../hooks/useRoleGuard';

const UpdateUser = () => {
    const navigate = useNavigate()
    const email = secureLocalStorage.getItem('loginE');
    const isAllowed = useRoleGuard(['dvc', 'admin'])
    if (!isAllowed) return null

    const { updateemail } = useParams()

    
    return (
        <div>
            {updateemail}
        </div>
    )
}

export default UpdateUser
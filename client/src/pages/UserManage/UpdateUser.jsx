import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const UpdateUser = () => {
    const navigate = useNavigate()
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    const email = secureLocalStorage.getItem('loginE');

    if(role === 'dvc' || role === 'admin'){
        return (
            <div>UpdateUser</div>
          )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        }, [])
    }

}

export default UpdateUser
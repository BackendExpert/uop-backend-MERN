import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

const VerfyOPT = () => {
    const navigate = useNavigate()
    const email = secureLocalStorage.getItem('email')

    if (email === '' || email.length === 0) {
        return (
            <div>VerfyOPT</div>
        )
    }
    else {
        useEffect(() => {
            navigate('/', { replace: true })
        }, [])
    }

}

export default VerfyOPT
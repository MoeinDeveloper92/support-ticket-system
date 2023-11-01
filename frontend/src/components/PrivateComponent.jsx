import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthState } from '../hooks/useAuthState'
import Spinner from './Spinner'

const PrivateComponent = () => {
    const { loggedIn, checkStatus } = useAuthState()

    if (checkStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateComponent
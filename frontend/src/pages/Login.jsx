import React, { useState } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt />Login
                </h1>
                <p>Please Login To Your Account!</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter Your Password'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
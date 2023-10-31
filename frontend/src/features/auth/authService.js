import axios from "axios"


const API_URL = "/api/users/"


//register user
const register = async (userData) => {
    const res = await axios.post(API_URL, userData)

    if (res.data) {
        //Once we get data fro, backend, we want to store it in the databse
        localStorage.setItem("user", JSON.stringify(res.data))
    }

    return res.data
}


//Logout
const logout = () => {
    localStorage.removeItem("user")
}


//login
const login = async (userData) => {
    const res = await axios.post(API_URL + "login", userData)

    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }

    return res.data
}

const authService = {
    register,
    login,
    logout
}


export default authService
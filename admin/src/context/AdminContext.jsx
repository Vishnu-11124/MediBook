import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): '')
    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/all-doctors',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(data.success) {
                setDoctors(data?.data)
                console.log(data?.data)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        token, setToken,
        backendUrl,
        doctors, getAllDoctors
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
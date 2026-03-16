import {useDispatch} from "react-redux";

import {logout} from "../store/authSlicec.js";
import api from "../api/axios.js";
import authApi from "../api/auth.js";
import {useState} from "react";

export const LogoutBtn = () => {
    const dispatch = useDispatch()
    const [error, setError] = useState({
        error: false,
        message: ""
    })

    const handleLogout = async () => {
        try {
            const res = await authApi.logout()
            if (!res || res.data.data.statusCode !== 200) {
                setError(() => ({error: true, message: "logout failed , please try again"}))
            }


            dispatch(logout())
        } catch (e) {
            setError(() => ({error: true, message: e.message + " " + "status code " + e.statusCode}))

        }
    }
    return error.error ? (
        <>
            <div className="border-4 border-black bg-[#FF395C] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-sm font-black uppercase text-black"> Error: {error.message}</h1>
            </div>
        </>
    ) :  (
        <>
            <button
                onClick={handleLogout}
                className="group relative inline-flex items-center gap-2 border-2 border-black bg-[#FF395C] px-6 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
            >
                <span>Logout</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="inherit"
                    className="transition-transform group-hover:rotate-12"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            </button>
        </>
    )
}
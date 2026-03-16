import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";

import { login as authLogin, logout } from "../store/authSlicec.js";
import { useForm } from "react-hook-form";
import authApi from "../api/auth.js";
import { useDispatch } from "react-redux";
import { Logo } from "./Logo.jsx";
import { Input } from "./Input.jsx";
import { Button } from "./Button.jsx";
import userApi from "../api/user.js";

export const Login = () => {

    const { register, handleSubmit } = useForm()
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState({
        error: false,
        message: ""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (payload) => {
        setLoader(true)

        setError((prev) => ({ ...prev, error: false, message: "" }))
        console.log(payload)
        try {

            const user = await userApi.getUser()
            if (user.data.data) {
                navigate('/')
                return
            }
            const res = await authApi.login(payload)

            if (!res || !res?.data || !res?.data?.data || res?.data?.data?.statusCode !== 200) {

                setError(() => ({ error: true, message: "error in authentication" }))
                setLoader(false)

            }

            if (res?.data) {
                const { data } = res

                dispatch(authLogin(data.data))
                setLoader(false)

                navigate('/login')
            }



        } catch (e) {
            setError(() => ({ error: true, message: "error in authentication " + e.message + " status - " + e.statusCode }))
            setLoader(false)
            dispatch(logout())



        }



    }



    if (loader) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-[#B4FF39]">
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-2xl font-black uppercase italic animate-pulse">Loading...</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center w-full min-h-screen bg-[#B4FF39] py-8">
                <div className="mx-auto w-full max-w-lg bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block border-2 border-black p-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Logo width='100px' />
                        </span>
                    </div>

                    <h2 className="text-center text-3xl font-black uppercase tracking-tighter text-black mb-2">
                        Login
                    </h2>
                    <p className="mt-2 text-center text-sm font-bold text-black/60 uppercase mb-8">
                        Don&apos;t have an account?&nbsp;
                        <Link
                            to="/signup"
                            className="text-black underline decoration-2 underline-offset-4 hover:bg-[#B4FF39] transition-all"
                        >
                            Sign Up
                        </Link>
                    </p>

                    {error.error && (
                        <p className="bg-red-500 text-white font-bold border-2 border-black p-3 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-sm">
                            {error.message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(login)} className="mt-8">
                        <div className="space-y-6">
                            <Input
                                label="email"
                                placeholder="enter email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "email must be valid"
                                    }
                                })}
                            />
                            <Input
                                label="password"
                                placeholder="enter password"
                                type="password"
                                {...register("password", { required: true })}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-[#FF395C] hover:bg-[#ff1f46] text-black font-black py-4 uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
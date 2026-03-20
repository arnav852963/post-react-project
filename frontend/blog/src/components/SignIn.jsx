import React, {useEffect, useState} from "react";
import { Link, useNavigate} from "react-router-dom";

import {login as authLogin, logout} from "../store/authSlicec.js";
import {useForm} from "react-hook-form";
import authApi from "../api/auth.js";
import {useDispatch} from "react-redux";
import {Logo} from "./Logo.jsx";
import {Input} from "./Input.jsx";
import {Button} from "./Button.jsx";
import userApi from "../api/user.js";

export const SignIn = () => {

    const {register , handleSubmit , setValue , watch } = useForm()
    const avatarFile = watch("avatar")
    const [error, setError] = useState({
        error:false,
        message:""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        ;(async ()=>{
            try{
                const user = await userApi.getUser()
                if(user && user?.data && user?.data?.data && user?.data?.statusCode === 200) navigate('/')

            } catch (e) {
                console.log(e.message)


            }
        })()
    }, []);

    const signin = async (payload)=>{

        setError((prev)=> ({...prev  , error:false , message:""}))
        console.log(payload)
        try {


            const res = await authApi.signin(payload)

            if(!res || !res?.data || !res?.data?.data || res?.data?.data?.statusCode !== 200) setError(()=>({error: true , message:"error in authentication"}))

            if(res?.data && res?.data?.data) {
                console.log(res?.data)
                navigate('/login')
            }



        }  catch (e) {
            setError(()=>({error: true , message:"error in authentication " + e.message + " status - " + e.statusCode}))
            dispatch(logout())



        }



    }

    return (
        <>
            <div className="flex items-center justify-center w-full min-h-screen bg-[#B4FF39] py-12">
                <div className="mx-auto w-full max-w-xl bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-6 flex justify-center">
                        <span className="inline-block border-2 border-black p-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Logo width='100px'/>
                        </span>
                    </div>

                    <h2 className="text-center text-4xl font-black uppercase tracking-tighter text-black mb-2">Sign Up</h2>

                    <p className="mt-2 text-center text-sm font-bold text-black/60 uppercase mb-8">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="text-black underline decoration-2 underline-offset-4 hover:bg-[#B4FF39] transition-all"
                        >
                            Log In
                        </Link>
                    </p>

                    {error.error && (
                        <p className="bg-red-500 text-white font-bold border-2 border-black p-3 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase text-sm">
                            {error.message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit(signin)} >
                        <div className="space-y-5">
                            <Input
                                label="fullName"
                                placeholder = "enter your name"
                                {...register("fullName" , {required:true})}
                            />

                            <Input
                                label ="username"
                                placeholder = "enter username"
                                {...register("username" , {required:true})}
                            />

                            <Input
                                label = "email"
                                placeholder = "enter email"
                                type = "email"
                                {...register("email" , {
                                    required: true,
                                    validate:{
                                        matchPattern:(value)=> /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)  || "email must  be valid"
                                    }
                                })}
                            />

                            <Input
                                label = "password"
                                placeholder = "enter password"
                                type='password'
                                {...register("password" , {required:true})}
                            />





                            <Button
                                type = "submit"
                                className="w-full bg-[#FF395C] py-4 text-black font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                            >
                                Create Account
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
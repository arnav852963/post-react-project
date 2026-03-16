import React,{useState} from "react";
import {data, Link, useNavigate} from "react-router-dom";

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

    const signin = async (payload)=>{

        setError((prev)=> ({...prev  , error:false , message:""}))
        console.log(payload)
        try {

            const user  = await userApi.getUser()
            if(user.data.data) {
                navigate('/')
                return
            }
            const res = await authApi.signin(payload)

            if(!res || !res?.data || !res?.data?.data || res?.data?.data?.statusCode !== 200) setError(()=>({error: true , message:"error in authentication"}))

            if(res?.data) {
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

                            <div className="space-y-2">
                                <label className="block text-sm font-black uppercase tracking-wider text-black">Avatar</label>

                                <div
                                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('bg-[#B4FF39]'); }}
                                    onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('bg-[#B4FF39]'); }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('bg-[#B4FF39]');
                                        const file = e.dataTransfer.files[0];
                                        if (file) setValue("avatar", e.dataTransfer.files);
                                    }}
                                    onClick={() => document.getElementById('avatar-input').click()}
                                    className="group relative flex flex-col items-center justify-center w-full h-32 border-4 border-dashed border-black bg-white hover:bg-gray-50 transition-all cursor-pointer overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    {avatarFile && avatarFile[0] ? (
                                        <div className="flex flex-col items-center p-2 text-center">
                                            <p className="text-sm text-black font-black uppercase italic">Selected: {avatarFile[0].name}</p>
                                            <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">Click to swap</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center">
                                            <svg className="w-8 h-8 mb-2 text-black transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeWidth="3" strokeLinecap="square" />
                                            </svg>
                                            <p className="text-xs font-black uppercase text-black">Drop avatar or click</p>
                                        </div>
                                    )}

                                    <Input
                                        type="file"
                                        id="avatar-input"
                                        accept="image/*"
                                        className="hidden"
                                        {...register("avatar", { required: true })}
                                        onChange={(e) => setValue("avatar", e.target.files)}
                                    />
                                </div>
                            </div>

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
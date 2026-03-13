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

    const {register , handleSubmit } = useForm()
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
            <div>
                <div>
                    <div>

                        <span>
                            <Logo width='100px'/>
                        </span>
                    </div>

                    <h2> Login</h2>

                    {error.error && (
                        <p> {error.message}</p>
                    )}

                    <form onSubmit={handleSubmit(signin)} >

                        <div>

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
                            type='passord'
                            {...register("password" , {required:true})}
                            />
                            <Input
                                label="avatar"
                                type="image"
                                {...register("avatar" , {required:true})}



                            />




                            <Button
                                type = "submit"
                                className="w-full"

                            >

                              Sign In

                            </Button>



                        </div>
                    </form>
                </div>


            </div>






        </>
    )
}

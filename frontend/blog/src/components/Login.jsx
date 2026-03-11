import React,{useState} from "react";
import {data, Link, useNavigate} from "react-router-dom";

import {login as authLogin, logout} from "../store/authSlicec.js";
import {useForm} from "react-hook-form";
import authApi from "../api/auth.js";
import {useDispatch} from "react-redux";
import {Logo} from "./Logo.jsx";
import {Input} from "./Input.jsx";

export const Login = () => {

    const {register , handleSubmit } = useForm()
    const [error, setError] = useState({
        error:false,
        message:""
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (payload)=>{

        setError((prev)=> ({...prev  , error:false , message:""}))
        try {
            const res = await authApi.login(payload)

            if(!res || !res?.data || !res?.data?.data || res?.data?.data?.statusCode !== 200) setError(()=>({error: true , message:"error in authentication"}))

            if(res?.data) {
                const {data} = res

                dispatch(authLogin(data.data))

                navigate('/')
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

                    <form onSubmit={handleSubmit(login)} >

                        <div>

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
                        </div>
                    </form>
                </div>


            </div>






        </>
    )
}

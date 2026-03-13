import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const Protection = ({children  , authentication = true , }) => {
    const [loader, setLoader] = useState(true);
    const navigation = useNavigate()
    const auth = useSelector((state)=> state.auth.isAuthenticated)

    useEffect(()=>{
        setLoader(true)

        if(authentication && auth !==authentication) navigation("/login")
        else if( !authentication && auth  !== authentication )  navigation("/")

        setLoader(false)

    }  , [authentication , auth , navigation])
    return !loader ? (
        <>
            {children}
        </>


    ) : (
        <h1> loading... </h1>
    )
}

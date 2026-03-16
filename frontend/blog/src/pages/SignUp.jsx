import React from "react";
import {SignIn as SignInComponent} from "../components/SignIn.jsx";

export const SignUp = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#B4FF39] py-12 px-4 selection:bg-black selection:text-white">
            <div className="w-full max-w-xl">
                <div className="bg-white border-4 border-black p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <SignInComponent />
                </div>
            </div>
        </div>
    )
}
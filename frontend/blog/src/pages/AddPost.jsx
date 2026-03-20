import React, {useEffect} from "react";
import {Container} from "../container/Container.jsx";
import {PostForm} from "../components/post-form/PostForm.jsx";
import userApi from "../api/user.js";
import {useNavigate} from "react-router-dom";

export const AddPost = () => {
const navigate = useNavigate()
    useEffect(() => {
        ;(async ()=>{
            try{
                const user =await userApi.getUser()
                if(!user || !user?.data || !user?.data?.data || user?.data?.statusCode !== 200) {
                    navigate('/login')

                }




            }catch (e) {
                console.log(e.message)
                navigate('/login')


            }

        })()
    }, []);


    return (
        <>
            <div className="py-12 bg-gray-50 min-h-screen selection:bg-[#B4FF39]">
                <Container>
                    <div className="mb-10">
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black italic">
                            Create <span className="bg-[#B4FF39] px-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Post</span>
                        </h1>

                    </div>

                    <PostForm/>
                </Container>
            </div>
        </>
    )
}
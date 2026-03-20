import React , {useState , useEffect} from "react";
import {Container} from "../container/Container.jsx";
import {PostCard} from "../components/PostCard.jsx";
import blogApi from "../api/blog.js";
import {Link, useNavigate} from "react-router-dom";
import {set} from "react-hook-form";
import userApi from "../api/user.js";

export const Home = () => {

    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(true)
const navigate = useNavigate()
    const [allBlogs ,  setAllBlogs] =useState(null)
    useEffect(() => {
        setError({error:false , message:''})
        setLoader(true)
        ;(async ()=>{

            try{
                const user =await userApi.getUser()
                if(!user || !user?.data || !user?.data?.data || user?.data?.statusCode !== 200) {
                    navigate('/login')
                    return
                }




            }catch (e) {
                console.log(e.message)
                navigate('/login')
                return

            }
            try {
                const allBlogs = await blogApi.getAllBlogs()
                if(!allBlogs || !allBlogs?.data || allBlogs?.data?.data.length === 0) {
                    setError({error:true , message : "cannot fetch all posts"})
                    setLoader(false)
                    return

                }

                setAllBlogs(allBlogs?.data?.data)



            } catch (e) {
                setError({error: true , message: "cannot fetch all posts cause : "  + e.message})
                setLoader(false)



            }

        })()
    }, []);

    if(error?.error){
        if(error.message.includes("cause : ")) {
            return (
                <div className="min-h-[80vh] flex items-center justify-center bg-[#B4FF39] px-4">
                    <div className="bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center max-w-md">
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-6 italic">Please Login</h1>
                        <Link to='/login'>
                            <button className="w-full bg-[#FF395C] border-4 border-black py-3 px-6 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                                Towards Login
                            </button>
                        </Link>
                    </div>
                </div>
            )
        }

        else{

            return (
                <div className="min-h-[80vh] flex items-center justify-center bg-white p-4">
                    <div className="bg-[#FF395C] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h1 className="text-black text-2xl font-black uppercase tracking-tight">
                            {error.message}
                        </h1>
                    </div>
                </div>
            )
        }
    }

    return loader ?  (<>
        <div className="min-h-screen flex items-center justify-center bg-[#B4FF39]">
            <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <h1 className="text-black text-6xl font-black uppercase italic tracking-tighter flex">
                    {"Loading...".split("").map((letter, index) => (
                        <span
                            key={index}
                            className="animate-bounce"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                    {letter === " " ? "\u00A0" : letter}
                </span>
                    ))}
                </h1>
            </div>
        </div>
    </>)  : (
        <div className="w-full bg-white py-12">
            <Container>
                <div className="flex flex-wrap -m-4">
                    {
                        allBlogs?.map((item)=>(
                            <div key={item._id} className="p-4 w-full md:w-1/2 lg:w-1/3">
                                <PostCard
                                    id={item._id}
                                    featuredImage={item.featuredImage}
                                    title={item.title}
                                />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
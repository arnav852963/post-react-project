import React , {useState , useEffect} from "react";
import {Container} from "../container/Container.jsx";
import {PostCard} from "../components/PostCard.jsx";
import blogApi from "../api/blog.js";
import {Link} from "react-router-dom";
import {set} from "react-hook-form";

export const Home = () => {

    const [error, setError] = useState(null)

    const [allBlogs ,  setAllBlogs] =useState(null)
    useEffect(() => {
        setError({error:false , message:''})
        ;(async ()=>{
            try {
                const allBlogs = await blogApi.getAllBlogs()
                if(!allBlogs || !allBlogs?.data || allBlogs?.data?.data.length === 0) {
                    setError({error:true , message : "cannot fetch all posts"})
                    return

                }

                setAllBlogs(allBlogs?.data?.data)



            } catch (e) {
                setError({error: true , message: "cannot fetch all posts cause : "  + e.message})



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

    return (
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
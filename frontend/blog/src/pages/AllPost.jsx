import {useEffect, useState} from "react";
import {PostCard} from "../components/PostCard.jsx";
import blogApi from "../api/blog.js";
import {Container} from "../container/Container.jsx";

export const AllPost = () => {

    const [blogs, setBlogs] = useState(null);
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setError({error: false , message: ''})
        setLoader(true)
        ;(async () => {
            try {
                const allBlogs = await blogApi.getAllBlogs()
                if (!allBlogs || !allBlogs.data || !allBlogs.data.data || allBlogs.data.statusCode !== 200) {
                    setLoader(false)
                    setError({error: true, message: "couldn't fetch  the blogs"})
                }
                setBlogs(() => allBlogs?.data?.data)
                setLoader(false)
            } catch (e) {
                setError({error: true, message: "couldn't fetch  the blogs cause : " + e.message})
                setLoader(false)
            }
        })()
    }, [])

    if (loader) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-white">
                <div className="bg-[#B4FF39] border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-black text-6xl font-black uppercase italic animate-pulse tracking-tighter">
                        Loadingg....
                    </h1>
                </div>
            </div>
        )
    }

    return error?.error ? (
        <div className="min-h-[70vh] flex items-center justify-center bg-white p-4">
            <div className="bg-[#FF395C] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-black text-2xl font-black uppercase tracking-tight">
                    {error.message}
                </h1>
            </div>
        </div>
    ) : (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                <div className="flex flex-wrap -m-4">
                    {
                        blogs?.map((item)=> (
                            <div key={item._id} className="p-4 w-full md:w-1/2 lg:w-1/3">
                                <PostCard
                                    title={item.title}
                                    id={item._id}
                                    featuredImage={item.featuredImage}
                                />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
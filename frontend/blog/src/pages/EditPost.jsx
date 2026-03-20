import {PostForm} from "../components/post-form/PostForm.jsx";
import {useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import blogApi from "../api/blog.js";
import {Container} from "../container/Container.jsx";
import userApi from "../api/user.js";

export const EditPost = () => {

    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)
    const {id} = useParams()
    const navigate  = useNavigate()
    useEffect(() => {
        setError((prev) => ({message: '' , error:false}))
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
                const getPost = await blogApi.getBlog(id)
                if(!getPost || !getPost?.data || !getPost?.data?.data || getPost?.data?.statusCode !==200) {

                    setError({error:true , message: "cant fetch blog"})
                    navigate('/')

                }

                setPost(getPost?.data?.data)

            } catch (e) {
                setError({error:true , message: "cant fetch blog  cause : " + e.message})
                navigate("/")

            }

        })()

    }, [id  , navigate]);

    return error?.error ? (
        <div className="min-h-[70vh] flex items-center justify-center bg-white p-4">
            <div className="bg-[#FF395C] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h1 className="text-black text-2xl font-black uppercase tracking-tight">
                    {error.message}
                </h1>
            </div>
        </div>
    ): (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black italic leading-none">
                            Edit <span className="bg-[#B4FF39] px-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Post</span>
                        </h1>
                        <p className="mt-4 text-sm font-bold uppercase tracking-widest text-black/60 italic">
                            Refining your masterpiece for the masses.
                        </p>
                    </div>
                    {post && (
                        <div className="text-xs font-black uppercase bg-black text-white px-3 py-1 shadow-[4px_4px_0px_0px_rgba(180,255,57,1)]">
                            ID: {id}
                        </div>
                    )}
                </div>

                <PostForm post={post}  />
            </Container>
        </div>
    )
}
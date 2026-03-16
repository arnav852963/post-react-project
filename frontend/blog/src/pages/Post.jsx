import {useState , useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import blogApi from "../api/blog.js";
import {PostCard} from "../components/PostCard.jsx";
import {Container} from "../container/Container.jsx";

export const Post = () => {
    const [post, setPost] = useState(null)
    const [error, setError] = useState(null)

    const {id} = useParams()
    const navigate = useNavigate()
    const {_id} = useSelector((state) => state.auth.userInfo)

    useEffect(() => {

        setError({error:false , message: ''})
        ;(async ()=>{
            try {

                const getPost = await blogApi.getBlog(id)
                if(!getPost || !getPost?.data || !getPost?.data?.data || getPost?.data?.statusCode !==200) {

                    setError({error:true , message: "cant get the post"})
                    navigate('/')
                }
                setPost(getPost?.data?.data)

            } catch (e) {
                setError({error:true , message: "cant get the post cause : " + e.message})
                navigate('/')

            }


        })()
    }, [id]);


    const handleDelete = async ()=>{
        setError({error:false , message: ''})
        try {
            const deletePost = await blogApi.deleteBlog(id)
            if(deletePost?.data?.statusCode !== 200) {

                setError({error: true , message: "was not able to delete post"})
                return

            }
            navigate('/')
        } catch (e) {

            setError({error: true , message: "was not able to delete post"})
            navigate('/')

        }
    }

    if(error?.error){
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#B4FF39]">
                <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-black text-6xl font-black uppercase italic animate-pulse tracking-tighter">
                        Loading...
                    </h1>
                </div>
            </div>
        )
    }

    const bool = post?.owner === _id

    return post ? (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                <div className="w-full flex justify-center mb-8 relative border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-gray-200 overflow-hidden">
                    <img
                        src={post?.featuredImage}
                        alt={post?.title}
                        className="w-full h-auto object-cover"
                    />

                    {bool && (
                        <div className="absolute right-6 top-6 flex flex-col gap-3">
                            <Link to={`/edit-post/${post?._id}`}>
                                <button className="bg-[#B4FF39] border-2 border-black px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                    Edit
                                </button>
                            </Link>

                                <button onClick={handleDelete} className="bg-[#FF395C] border-2 border-black px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                    Delete
                                </button>

                        </div>
                    )}
                </div>

                <div className="w-full mb-8">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                        {post?.title}
                    </h1>
                </div>

                <div className="prose prose-xl max-w-none font-bold text-black border-l-4 border-black pl-6 py-2">

                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </Container>
        </div>
    ) : null
}
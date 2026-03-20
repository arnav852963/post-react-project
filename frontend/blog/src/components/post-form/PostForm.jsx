import React, {useCallback, useEffect, useState} from "react";
import {set, useForm} from "react-hook-form";
import{Button} from "../Button.jsx"
import {Input} from "../Input.jsx"
import {Select} from "../Select.jsx"
import blogApi from "../../api/blog.js"
import {RTE} from "../RTE.jsx"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const PostForm = ({post}) => {
    const {register , handleSubmit , watch , setValue , control , getValues} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug : post?.slug || '',
            content: post?.content || '',
            status:post?.status || 'active'
        }
    })

    const [error, setError] = useState({
        error:false,
        message:""
    })


    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userInfo)

    const submit = async (data)=>{
        console.log(data)
        const form  = new FormData()
        setError({error: false , message: ""})

        if(post){
            const form  = new FormData()
            try {
                if(data.image[0]){
                    form.append('featuredImage' , data.image[0])
                    try {
                        const file = await blogApi.updateFeaturedImage(post?._id, form)
                        if (!file || !file.data  || file.data.statusCode !== 200) setError({
                            error: true,
                            message: "error in image upload "
                        })
                    } catch (e) {
                        setError({
                            error: true,
                            message: "error in image upload " + e.message
                        })
                    }
                }

                try {
                    const updatePost = await blogApi.updateBlog({
                        ...data
                    })

                    if (!updatePost || !updatePost.data || !updatePost.data.data || updatePost.data.data.statusCode !== 200) setError({
                        error: true,
                        message: "error in updating the  post "
                    })

                    navigate(`/post/${post?._id}`)
                } catch (e) {
                    setError({
                        error: true,
                        message: "error in blogUpdate " + e.message
                    })
                }
            } catch (e) {
                setError({error: true , message: "error occurred " + e.message})
            }
        }
        else {
            const form = new FormData()
            for (const [key, value] of Object.entries(data)) {
                if (key === 'image') {
                    form.append('featuredImage', data.image[0])
                }
                form.append(`${key}`, value)
            }

            try {
                const createPost = await blogApi.createBlog(form)
                if (!createPost || !createPost.data ||  createPost.data.statusCode !== 201) setError({
                    error: true,
                    message: "error in creating the  post "
                })
                navigate(`/post/${createPost.data.data._id}`)
            } catch (e) {
                setError({
                    error: true,
                    message: "error in creating the  post " + e.message
                })
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
        }
        return ''
    } , [])

    useEffect(()=>{
        const subscription  = watch((value , {name})=>{
            if(name === 'title') setValue('slug' , slugTransform(value.title) , {shouldValidate:true})
        })
        return ()=>{
            subscription.unsubscribe()
        }
    } , [watch , slugTransform , setValue])

    return (
        <div className="p-6 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-full lg:w-2/3 px-2 space-y-6">
                    <Input
                        label="Title"
                        placeholder="Title"
                        className="bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:bg-[#B4FF39] transition-all"
                        {...register("title" , {required:true})}
                    />

                    <Input
                        label="Slug"
                        placeholder="Slug"
                        className="bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        {...register("slug" , {required:true})}
                        onInput={(e)=>{
                            setValue("slug" , slugTransform(e.currentTarget.value)  , {shouldValidate:true})
                        }}
                    />

                    <div className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <RTE
                            label="Content :"
                            name="content"
                            control={control}
                            defaultValue={getValues('content')}
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-2 space-y-6 mt-6 lg:mt-0">
                    <div className="border-4 border-black p-4 bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Input
                            label="Featured Image"
                            type='file'
                            className="bg-white file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-xs file:font-black file:uppercase file:bg-[#B4FF39] file:hover:bg-white transition-all cursor-pointer"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image" ,  {required:!post})}
                        />

                        {post && (
                            <div className="mt-4 border-2 border-black overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <img src={post.featuredImage} alt={post.title} className="w-full grayscale hover:grayscale-0 transition-all"/>
                            </div>
                        )}
                    </div>

                    <div className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            {...register("status" , {required:true})}
                        />
                    </div>

                    {error.error && (
                        <div className="p-3 bg-red-500 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {error.message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className={`w-full py-4 font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${post ? "bg-[#B4FF39]" : "bg-[#FF395C]"}`}
                    >
                        {post ? "Update Post" : "Publish Post"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
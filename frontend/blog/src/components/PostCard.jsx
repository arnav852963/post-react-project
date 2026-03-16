import React from "react";
import blogApi from "../api/blog.js";
import {Link} from "react-router-dom";

export const PostCard = ({id , title , featuredImage}) => {
    return (
        <Link to={`/post/${id}`} className="block group">
            <div className='w-full bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#B4FF39]' >
                <div className="w-full justify-center mb-4 border-2 border-black overflow-hidden bg-gray-200">
                    <img
                        src={featuredImage}
                        alt={title}
                        className='w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300'
                    />
                </div>

                <h2 className='text-xl font-black uppercase tracking-tighter leading-tight text-black'>
                    {title}
                </h2>

                <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-black uppercase border-2 border-black px-2 py-1 bg-white">
                  Read More
                </span>
                </div>
            </div>
        </Link>
    )
}
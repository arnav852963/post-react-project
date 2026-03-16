import React from "react";
import {Container} from "../container/Container.jsx";
import {PostForm} from "../components/post-form/PostForm.jsx";

export const AddPost = () => {
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
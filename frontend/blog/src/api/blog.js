import api from "./axios.js";

const  blogApi={
    createBlog: (blogData)=>{
        return api.post("/blog/createBlog", blogData , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    getBlog: (blogId)=>{
        return api.get(`/blog/getBlog/${blogId}`);
    },
    getUserBlogs: ()=>{
        return api.get("/blog/getUserBlogs");
    },
    getAllBlogs: ()=>{
        return api.get("/blog/getAllBlogs");
    },
    updateBlog: (blogId, updatedData)=>{
        return api.patch(`/blog/updateBlog/${blogId}`, updatedData);
    },
    updateFeaturedImage: (blogId, formData)=>{
        return api.patch(`/blog/updateFeaturedImage/${blogId}`, formData , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    deleteBlog:(id)=>{
        return api.delete(`/blog/deleteBlog/${id}`)
    }

}

export default blogApi
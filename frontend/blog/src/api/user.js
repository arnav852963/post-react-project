import api from "./axios.js";

const userApi={
    getUser: ()=>{
        return api.get("/user/getUser");
    },

    refreshToken: ()=>{
        return api.patch("/user/refreshToken");
    },
    updateAvatar: (formData)=>{
        return api.patch("/user/updateAvatar", formData , {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}

export default userApi
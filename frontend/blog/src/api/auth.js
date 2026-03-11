import api from "./axios.js";

const authApi={
    login:async (credentials)=>{

              return api.post("/auth/login",credentials);


    },
    logout: ()=>{

            return  api.patch("/auth/logout");


    }
}

export default authApi
import api from "./axios.js";

const authApi={

    signin:async (credentials)=>{

        return api.post("/auth/signin",credentials);


    },


    login:async (credentials)=>{

              return api.post("/auth/login",credentials);


    },
    logout: ()=>{

            return  api.patch("/auth/logout");


    }
}

export default authApi
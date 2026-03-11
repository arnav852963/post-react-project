import {configureStore} from "@reduxjs/toolkit"
import {authReducers} from "./authSlicec.js";

const store = configureStore({
    reducer:{
        auth: authReducers

    }
})

export default store
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./store/store.js";
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Protection} from "./components/AuthLayout.jsx";
import {Login} from "./pages/Login.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {AllPost} from "./pages/AllPost.jsx";
import {Editor} from "@tinymce/tinymce-react";
import {EditPost} from "./pages/EditPost.jsx";
import {Post} from "./pages/Post.jsx";
import {AddPost} from "./pages/AddPost.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path: '/login',
                element: (
                    <Protection authentication={false}>
                        <Login/>
                    </Protection>
                )
            },
            {
                path: '/signup',
                element: (
                    <Protection authentication={false}>
                        <SignUp/>
                    </Protection>
                )
            },
            {
                path: '/all-post',
                element: (
                    <Protection authentication={true}>
                       <AllPost/>
                    </Protection>
                )
            },
            {
                path: '/edit-post/:id',
                element: (
                    <Protection authentication={true}>
                        <EditPost/>
                    </Protection>
                )
            },
            {
                path: '/post/:id',
                element: (
                    <Protection authentication={true}>
                      <Post/>
                    </Protection>
                )
            },
            {
                path: '/add-post',
                element: (
                    <Protection authentication={true}>
                       <AddPost/>
                    </Protection>
                )
            },

            {
                path: '/edit-post/:id',
                element: (
                    <Protection authentication={true}>
                        <EditPost/>
                    </Protection>
                )
            },

        ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
       <App />
      </Provider>
  </StrictMode>,
)

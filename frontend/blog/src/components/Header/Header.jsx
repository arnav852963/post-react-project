import {Container} from "../../container/Container.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Logo} from "../Logo.jsx";
import {LogoutBtn} from "../LogoutBtn.jsx";

import React from "react";

export const Header = () => {

    const authStatus = useSelector(state => state.auth?.isAuthenticated)

    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <>
            <header className="py-4 bg-white border-b-4 border-black sticky top-0 z-50">
                <Container>
                    <nav className="flex items-center">
                        <div className="mr-4">
                            <Link to="/" className="block border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all bg-white">
                                <Logo width ="70px" />
                            </Link>
                        </div>

                        <ul className="flex ml-auto items-center gap-4" >
                            {
                                navItems.map((item)=>{
                                    return item.active ? (
                                        <li key={item.name}>
                                            <button
                                                onClick={ ()=>navigate(item.slug)}
                                                className="px-4 py-2 text-sm font-black uppercase tracking-widest text-black border-2 border-transparent hover:border-black hover:bg-[#B4FF39] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                })
                            }

                            {authStatus && (
                                <li className="ml-2">
                                    <LogoutBtn/>
                                </li>
                            )}
                        </ul>
                    </nav>
                </Container>
            </header>
        </>
    )
}
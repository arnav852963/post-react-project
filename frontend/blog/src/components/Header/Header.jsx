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
            <header >
                <Container>
                    <nav>
                        <div>
                            <Link to="/">
                                <Logo width ="70px" />


                            </Link>
                        </div>


                        <ul className="flex ml-auto" >

                            {
                                navItems.map((item)=>{
                                    return item.active ? (
                                        <>
                                            <li key={item.name}>
                                                <button
                                                    onClick={ ()=>navigate(item.slug)}

                                                > {item.name}

                                                </button>



                                            </li>

                                        </>

                                    ) : null


                                })
                            }

                            {authStatus && (
                                <>
                                    <li>

                                        <LogoutBtn/>
                                    </li>

                                </>
                            )}


                        </ul>
                    </nav>


                </Container>


            </header>

         </>
    )
}


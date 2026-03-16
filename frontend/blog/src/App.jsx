import {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import userApi from "./api/user.js";
import {login, logout} from "./store/authSlicec.js";
import {Header} from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import {Outlet} from "react-router-dom";


function App() {

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState({
        error:false,
        message:""

    })

    const dispatch = useDispatch()


    useEffect(()=>{

        ;(async ()=>{
            try {
                setLoading(true)
                setError((prv)=>{ return {...prv , error: false , message: ""}})
                const res = await userApi.getUser()
                if(!res) throw new Error("no response from server")
                const {data} = res
                if(res.status!== 200)  {

                    setError((prev)=> {return {...prev , error:true ,  message: data.data.message + `error code ${data.statusCode}`}})
                    dispatch(logout)
                }

                dispatch(login(data.data))

                setLoading(false)




            } catch (e) {
                setLoading(false)
                setError((prev)=> {return { error:true ,  message: e.message}})
                dispatch(logout())
                console.log(e.message)

            }
        })()




    } , [])

    if(error.error) return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-[#FF395C] p-10"   >
                <div className="bg-white border-8 border-black p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-4xl">
                    <h1 className="text-black text-6xl font-black uppercase tracking-tighter italic leading-none">
                        Error Occured: <br/>
                        <span className="text-3xl normal-case font-bold mt-4 block border-t-4 border-black pt-4">
                            {error.message}
                        </span>
                    </h1>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 bg-[#B4FF39] border-4 border-black px-8 py-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </>
    )


    return !loading ? (
            <>
                <div className="min-h-screen flex flex-wrap content-between bg-white font-sans selection:bg-[#B4FF39]">
                    <div className="w-full block">
                        <Header/>
                        <main className="min-h-[70vh] bg-gray-50">
                            <Outlet/>
                        </main>
                        <Footer/>
                    </div>
                </div>
            </>
        ) :
        (<>
            <div className="min-h-screen flex items-center justify-center bg-[#B4FF39]">
                <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                    <h1 className="text-black text-6xl font-black uppercase italic tracking-tighter flex">
                        {"Loading...".split("").map((letter, index) => (
                            <span
                                key={index}
                                className="animate-bounce"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                    {letter === " " ? "\u00A0" : letter}
                </span>
                        ))}
                    </h1>
                </div>
            </div>
        </>)
}

export default App
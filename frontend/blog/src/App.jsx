import {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import userApi from "./api/user.js";
import {login, logout} from "./store/authSlicec.js";
import {Header} from "./components/Header/Header.jsx";
import {Footer} from "./components/Footer/Footer.jsx";
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
            <div className="min-h-screen flex flex-wrap content-between bg-amber-950"   >
            <h1 className=" text-amber-500 text-8xl "> Error Occured : {error.message} </h1>
            </div>


        </>
    )


  return !loading ? (
      <>
          <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
              <div className="w-full block">
                  <Header/>
                  <main>
                      <Outlet/>
                  </main>
                  <Footer/>

              </div>

          </div>





      </>
  ) :
      (<>
          <h1 className="min-h-screen flex flex-wrap content-between bg-amber-950 text-amber-500 text-8xl "   > Loading... </h1>

  </>)
}

export default App

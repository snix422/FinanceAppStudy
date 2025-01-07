import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import RoleBasedLayout from "./RoleBasedLayout"

const HomePage = () => {
  
    const [tokenUser, setTokenUser] = useState<any>(null)

    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        setTokenUser(token)
    },[localStorage.getItem("authToken")])
   
    return(
        <main>
           <h1>Strona główna</h1>
           {!tokenUser ? <div>
            <Link to={'/signIn'}>Logowanie</Link>
            <Link to={'/signUp'}>Rejestracja</Link>
            </div> : <RoleBasedLayout /> }
        </main>
    )
}

export default HomePage
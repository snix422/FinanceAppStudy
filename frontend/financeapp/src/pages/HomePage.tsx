import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import RoleBasedLayout from "./RoleBasedLayout"

const HomePage = () => {
  
    const [tokenUser, setTokenUser] = useState<any>(null)

    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        setTokenUser(token)
    },[localStorage.getItem("authToken")])

    if(tokenUser){
        return <RoleBasedLayout />
    }
   
    return(
        <main>
           <h1>Strona główna</h1>
           { <div>
            <Link to={'/signIn'}>Logowanie</Link>
            <Link to={'/signUp'}>Rejestracja</Link>
            </div>  }
        </main>
    )
}

export default HomePage
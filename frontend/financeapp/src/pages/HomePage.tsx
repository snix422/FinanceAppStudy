import { Link } from "react-router-dom"
import { useState } from "react"
import RoleBasedLayout from "./RoleBasedLayout"
import "../styles/HomePage.css"

const HomePage = () => {
  
    const [tokenUser, setTokenUser] = useState<any>(null)

   

    if(tokenUser){
        return <RoleBasedLayout />
    }
   
    return(
        <main className="homepage">
           <h1 className="homepage-title">Aplikacja do zarządzania budżetem</h1>
           {<div className="homepage-links">
            <Link to={'/signIn'} className="homepage-link">Logowanie</Link>
            <Link to={'/signUp'} className="homepage-link">Rejestracja</Link>
            </div>  }
        </main>
    )
}

export default HomePage
import UserPanel from "./UserPanel"

const HomePage = () => {
    const token = localStorage.getItem("authToken")
    console.log(token)

    
   
    return(
        <main>
           <h1>Strona główna</h1>
           <UserPanel />
        </main>
    )
}

export default HomePage
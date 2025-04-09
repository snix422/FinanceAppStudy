import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import "../styles/AdminView.css"
import { useAuth } from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";


const AdminView = () => {


    const {users, isLoading, error} = useUsers();
    console.log(users)
    return(
        <div className="admin-page">
            <h2 className="admin-title">Lista użytkowników</h2>
            {isLoading && <h3>Loading...</h3>}
            {error && <h3>{error.message}</h3>}
            {!isLoading && !error &&  <UsersList users={users} /> }
            
        </div>
    )
}

export default AdminView
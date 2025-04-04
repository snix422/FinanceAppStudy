import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import "../styles/AdminView.css"
import { useAuth } from "../hooks/useAuth";


const AdminView = () => {

    const context = useAuth();
    console.log(context)
    return(
        <div className="admin-page">
            <h2 className="admin-title">Lista użytkowników</h2>
            <UsersList users={[]} />
        </div>
    )
}

export default AdminView
import { useEffect, useState } from "react"
import BudgetModal from "../components/BudgetModal"
import BudgetsList from "../components/BudgetsList"
import UserView from "../components/UserView"
import AdminView from "../components/AdminView"
import { useNavigate } from "react-router-dom"
import HomePage from "./HomePage"
import { Home } from "@mui/icons-material"
import "../styles/RoleBasedLayout.css"
import useBudgets from "../hooks/useBudgets"
import { useAuth } from "../hooks/useAuth"


const RoleBasedLayout = () => {
    
    const context = useAuth();
    const navigate = useNavigate();

    // **Sprawdzamy, czy `context` i `context.user` istnieją**
    if (!context || !context.user) {
        return <HomePage />;
    }

    const handleLogOut = () => {
        context.logOut();
        navigate("/");
    };

    return (
        <main>
            {context.user.role === "User" ? <UserView /> : <AdminView />}
            <button className="button-logout" onClick={handleLogOut}>Wyloguj się</button>
        </main>
    );
}

export default RoleBasedLayout
import UserView from "../components/UserView"
import AdminView from "../components/AdminView"
import { useNavigate } from "react-router-dom"
import HomePage from "./HomePage"
import "../styles/RoleBasedLayout.css"
import { useAuth } from "../hooks/useAuth"


const RoleBasedLayout = () => {
    
    const context = useAuth();
    const navigate = useNavigate();

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
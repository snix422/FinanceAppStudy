import { useEffect, useState } from "react"
import BudgetModal from "../components/BudgetModal"
import BudgetsList from "../components/BudgetsList"
import UserView from "../components/UserView"
import AdminView from "../components/AdminView"
import { useNavigate } from "react-router-dom"
import HomePage from "./HomePage"

const RoleBasedLayout = () => {
    const [budgets,setBudgets] = useState([])
    const [error, setError] = useState("")
    const [isOpenModal, setIsOpenModal] = useState(false)

    const tokenUser = (localStorage?.getItem("userData"));

    const parsedUser = tokenUser ? JSON.parse(tokenUser) : null

    console.log(parsedUser);

    const navigate = useNavigate();

    const fetchBudgets = async () => {
        // Wyświetl token w konsoli (dla debugowania)
        const token = localStorage.getItem("authToken");
        console.log("Auth Token:", token);
    
        // Sprawdź, czy token istnieje
        if (!token) {
            setError("Brak tokenu uwierzytelniającego. Zaloguj się ponownie.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5054/user/budgets', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Przekazanie tokena
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                if (response.status === 401) {
                    setError("Nieautoryzowany dostęp. Zaloguj się ponownie.");
                } else {
                    setError("Problem z pobraniem budżetów.");
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setBudgets(data); // Ustawienie danych w stanie
        } catch (error) {
            console.error("Błąd podczas pobierania budżetów:", error);
            setError("Problem z wczytaniem budżetu.");
        }
    };
    
    useEffect(() => {
        fetchBudgets();
    }, []);

    const toggleModal = () => {
        setIsOpenModal(prev => !prev);
    }

    console.log(budgets)

    const LogOut = () => {
        localStorage.removeItem("userData");
        localStorage.removeItem("authToken");
        navigate("/");
    }

    if(!parsedUser){
        return <HomePage />
    }
    return(
        <main>
            {parsedUser.role.name == "User" ? <UserView /> : <AdminView />}
            <button onClick={LogOut}>Wyloguj się</button>
        </main>
    )
}

export default RoleBasedLayout
import { useEffect, useState } from "react"
import BudgetsList from "./BudgetsList"
import BudgetModal from "./BudgetModal"
import "../styles/UserView.css"

const UserView = () => {

     const [budgets,setBudgets] = useState([])
        const [error, setError] = useState("")
        const [isOpenModal, setIsOpenModal] = useState(false)

        const fetchBudgets = async () => {
           
            const token = localStorage.getItem("authToken");
          
        
           
            if (!token) {
                setError("Brak tokenu uwierzytelniającego. Zaloguj się ponownie.");
                return;
            }
        
            try {
                const response = await fetch('http://localhost:5054/user/budgets', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, 
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
                setBudgets(data); 
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
        
    return(
        <main className="userview-page">
        {budgets ? <div className="userview-container">
            <h2 className="userview-title">Twoje budżety</h2>
            <BudgetsList budgets={budgets} />
        </div> : <h2 className="no-budgets-title">Brak budżetów</h2>}
        <BudgetModal isOpen={isOpenModal} closeModal={setIsOpenModal} refreshBudgets={fetchBudgets} />
        <button className="add-budget-button" onClick={toggleModal}>Dodaj budżet</button>
    </main>
    )
}

export default UserView
import { useEffect, useState } from "react"
import BudgetsList from "./BudgetsList"
import BudgetModal from "./BudgetModal"

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
        <main>
        {budgets ? <div>
            <h2>Twoje budżety</h2>
            <BudgetsList budgets={budgets} />
        </div> : <h2>Brak budżetów</h2>}
        <BudgetModal isOpen={isOpenModal} closeModal={setIsOpenModal} refreshBudgets={fetchBudgets} />
        <button onClick={toggleModal}>Dodaj budżet</button>
    </main>
    )
}

export default UserView
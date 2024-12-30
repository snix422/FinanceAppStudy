import { useEffect, useState } from "react"

const UserPanel = () => {
    const [budgets,setBudgets] = useState([])
    const [error, setError] = useState("")
    const [isOpenModal, setIsOpenModal] = useState(false)

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

    return(
        <main>
            {budgets ? <div>
                <h2>Twoje budżety</h2>
            </div> : <h2>Brak budżetów</h2>}
            <button onClick={toggleModal}>Dodaj budżet</button>
        </main>
    )
}

export default UserPanel 
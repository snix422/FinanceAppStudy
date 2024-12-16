import { useEffect, useState } from "react"

const UserPanel = () => {
    const [budgets,setBudgets] = useState([])
    const [error, setError] = useState("")
    const [isOpenModal, setIsOpenModal] = useState(false)

    const fetchBudgets = async () => {
        try {
            const response = await fetch('http://localhost:5054/api/user/budgets', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch budgets');
            }
    
            const data = await response.json();
            setBudgets(data);
        } catch (error) {
            console.error(error);
            setError("Problem z wczytaniem budżetu ")
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
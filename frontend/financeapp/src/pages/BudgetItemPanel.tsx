import { useEffect, useState } from "react";

const BudgetItemPanel = () => {

    const [budget,setBudget] = useState<any>(null);
    const [error,setError] = useState("")
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false) 

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
            setBudget(data);
        } catch (error) {
            console.error(error);
            setError("Problem z wczytaniem budżetu ")
        }
    };


    
    useEffect(() => {
        fetchBudgets();
    }, []);

    const toggleModal = () => {
        setIsOpenModal(prev => !prev)
    }

   return(
    <main>
        {error ? <h1>{error}</h1>:
        <div>
            <h1>Nazwa budżetu</h1>
            <h2>Środki budżetu</h2>
            <button>Dodaj wydatki</button>
        </div>
        }
    </main>
   ) 
}

export default BudgetItemPanel
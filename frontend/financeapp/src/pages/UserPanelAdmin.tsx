import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import BudgetsList from "../components/BudgetsList";

const UserPanelAdmin = () => {
    const {id} = useParams();

    const [budgets,setBudgets] = useState([])
    const [error, setError] = useState("")
        
    const fetchBudgets = async () => {
                   
        const token = localStorage.getItem("authToken");
                             
        if (!token) {
            setError("Brak tokenu uwierzytelniającego. Zaloguj się ponownie.");
            return;
        }
                
        try {
            const response = await fetch(`http://localhost:5054/api/budgets/${id}`, {
                method: 'GET',
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

       
    const deleteBudget = async (idBudget:any) => {
        try {
            const response = await fetch(`http://localhost:5054/api/budgets/${idBudget}}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })

            if(!response.ok){
                const errorData = await response.json();
                setError(errorData);
                return
            }
           fetchBudgets();
        } catch (error) {
            setError("Wystąpił problem z logowaniem")
            console.log(error)
        }
    }
                
        useEffect(() => {
            fetchBudgets();
        }, []);

        console.log(budgets)

    return(
        <main>
            <BudgetsList budgets={budgets} isAdmin={true} deleteBudget={deleteBudget} />
            <Link to={"/"}>Wróć</Link>
        </main>
    )
}

export default UserPanelAdmin
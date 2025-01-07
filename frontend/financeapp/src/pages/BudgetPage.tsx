import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseModal from "../components/ExpenseModal";
import ExpensesList from "../components/ExpensesList";

const BudgetPage = () => {

    const [budget,setBudget] = useState<any>()
    const [error, setError] = useState("")
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [expensenTotalAmount, setExpensesTotalAmount] = useState<any>(0)
    const [savingsTotal, setSavingsTotal] = useState<any>(0)
  
    const {id} = useParams();
    console.log(id)

    useEffect(()=>{
        const expensesTotal = budget?.expenses.reduce((acc:any,curr:any)=>acc + curr.amount,0);
        const savings = Number(budget?.amount - expensesTotal);
        setExpensesTotalAmount(expensesTotal);
        setSavingsTotal(savings);
    },[budget])


     const fetchBudgets = async () => {
            
            const token = localStorage.getItem("authToken");
            console.log("Auth Token:", token);
        
            if (!token) {
                setError("Brak tokenu uwierzytelniającego. Zaloguj się ponownie.");
                return;
            }
        
            try {
                const response = await fetch(`http://localhost:5054/budget/${id}`, {
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
                setBudget(data); // Ustawienie danych w stanie
            } catch (error) {
                console.error("Błąd podczas pobierania budżetów:", error);
                setError("Problem z wczytaniem budżetu.");
            }
        };
        
        useEffect(() => {
            fetchBudgets();
        }, []);

        const openModal = () => {
            setIsOpenModal(true);
        }

        if(!budget){
            return(
                <main>
                    <h2>Budżet nie został wczytany</h2>
                </main>
            )
        }

        console.log(budget)
    return(
        <main>
            <h2>Nazwa budżetu: {budget.name}</h2>
            <h3>Kwota budżetu: {budget.amount}</h3>
            <h3>Oszczędności: {savingsTotal}</h3>
            <button onClick={openModal}>Dodaj wydatek</button>
            <ExpensesList expenses={budget?.expenses} budgetId={id} refreshBudgets={fetchBudgets} />
            {isOpenModal ? <ExpenseModal isOpen={isOpenModal} close={setIsOpenModal} budgetId={id} refreshExpenses={fetchBudgets} /> : null}
        </main>
    )
}

export default BudgetPage
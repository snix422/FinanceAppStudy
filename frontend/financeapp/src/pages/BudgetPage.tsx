import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ExpenseModal from "../components/ExpenseModal";
import ExpensesList from "../components/ExpensesList";
import "../styles/BudgetPage.css"
import CharStatisticSavings from "../components/ChartStatisticsSavings";
import ChartExpenses from "../components/ChartExpenses";
import useBudget from "../hooks/useBudget";
import useExpenses from "../hooks/useExpenses";


const BudgetPage = () => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [expensesTotalAmount, setExpensesTotalAmount] = useState<any>(0)
    const [savingsTotal, setSavingsTotal] = useState<any>(0)
    const [kredytAmount, setKredytAmount] = useState<any>(0)
    const [zakupyAmount, setZakupyAmount] = useState<any>(0)
    const [rachunkiAmount, setRachunkiAmount] = useState<any>(0)
    const [paliwoAmount, setPaliwoAmount] = useState<any>(0)
  
    const { id } = useParams();
    const numericId = Number(id);
    const { budget ,isLoading,error} = useBudget(numericId)
    const { expenses, addExpense , removeExpense} = useExpenses(numericId);
    
    console.log(id)
    console.log(budget,"moj budzet");
    console.log(budget?.expenses)
    console.log(addExpense);
    console.log(expenses,'expenses')

   useEffect(()=>{
        if(isLoading == true ) return
        if(!budget || expenses.length == 0) {
            setSavingsTotal(budget.totalAmount)
            return
        }
        const expensesTotal = expenses.reduce((acc:any,curr:any)=>acc + curr.amount,0);
        const savings = Number(budget?.totalAmount - expensesTotal);
        setExpensesTotalAmount(expensesTotal);
        setSavingsTotal(savings);

        const kredytExpenses = expenses.filter((c:any)=> c.categoryName == "Kredyt");
        const zakupyExpenses = expenses.filter((c:any)=> c.categoryName == "Zakupy");
        const rachunkiExpenses = expenses.filter((c:any)=> c.categoryName == "Rachunki");
        const paliwoExpenses = expenses.filter((c:any)=> c.categoryName == "Paliwo");

        const kredytTotal = kredytExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)
        const zakupyTotal = zakupyExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)
        const rachunkiTotal = rachunkiExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)
        const paliwoTotal = paliwoExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)

        setKredytAmount(kredytTotal);
        setZakupyAmount(zakupyTotal);
        setRachunkiAmount(rachunkiTotal);
        setPaliwoAmount(paliwoTotal);

    },[budget,expenses])


        const openModal = () => {
            setIsOpenModal(true);
        }

        if (!id || isNaN(numericId)) return <p>Nieprawidłowe ID budżetu</p>;
        if (isLoading) return <p>Ładowanie budżetu...</p>;
        if (error) return <p>Wystąpił błąd podczas ładowania budżetu</p>;
      

       
    return(
        <main className="budget-container">
            <h2>Nazwa budżetu: {budget.title}</h2>
            <h3>Kwota budżetu: {budget.totalAmount}</h3>
            {expenses ? <h3>Oszczędności: {savingsTotal}</h3> : null }
            <button className="add-expense" onClick={openModal}>Dodaj wydatek</button>
            {expenses.length > 0 && 
            <div className="statictics-details">
            <ExpensesList expenses={expenses} budgetId={id} remove={removeExpense} />
            <div className="charts">
            <CharStatisticSavings budget={budget.amount} savings={savingsTotal} expenses={expensesTotalAmount} />
            <ChartExpenses kredyt={kredytAmount} zakupy={zakupyAmount} rachunki={rachunkiAmount} paliwo={paliwoAmount} />
            </div>
            </div>}
            <Link to="/">Powrót na stronę główną</Link>
            {isOpenModal ? <ExpenseModal isOpen={isOpenModal} close={setIsOpenModal} budgetId={id} addExpense={addExpense} /> : null}
            
        </main>
    )
}

export default BudgetPage
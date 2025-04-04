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
  
    const {id} = useParams();
    const {budget,isLoading,error} = useBudget(Number(id))
    const {expenses, addExpense} = useExpenses(Number(id))
    console.log(id)
    console.log(budget);

   useEffect(()=>{
        const expensesTotal = budget?.expenses.reduce((acc:any,curr:any)=>acc + curr.amount,0);
        const savings = Number(budget?.amount - expensesTotal);
        setExpensesTotalAmount(expensesTotal);
        setSavingsTotal(savings);

        const kredytExpenses = budget?.expenses.filter((c:any)=> c.categoryName == "Kredyt");
        const zakupyExpenses = budget?.expenses.filter((c:any)=> c.categoryName == "Zakupy");
        const rachunkiExpenses = budget?.expenses.filter((c:any)=> c.categoryName == "Rachunki");
        const paliwoExpenses = budget?.expenses.filter((c:any)=> c.categoryName == "Paliwo");

        const kredytTotal = kredytExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)
        const zakupyTotal = zakupyExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)
        const rachunkiTotal = rachunkiExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)
        const paliwoTotal = paliwoExpenses?.reduce((acc:any,curr:any) => acc + curr.amount,0)

        setKredytAmount(kredytTotal);
        setZakupyAmount(zakupyTotal);
        setRachunkiAmount(rachunkiTotal);
        setPaliwoAmount(paliwoTotal);

    },[budget])

    console.log(kredytAmount,'kredyt');
    console.log(zakupyAmount,'zakupy');
    console.log(rachunkiAmount,'rachunki');
    console.log(paliwoAmount,'paliwo');
    

        const openModal = () => {
            setIsOpenModal(true);
        }

        if(isLoading){
            return(
                <main>
                    <h2>Ładowanie...</h2>
                </main>
            )
        }

        if(error){
            return(
                <main>
                    <h2>Budżet nie został wczytany</h2>
                </main>
            )
        }

        console.log(budget)
    return(
        <main className="budget-container">
            <h2>Nazwa budżetu: {budget.name}</h2>
            <h3>Kwota budżetu: {budget.amount}</h3>
            <h3>Oszczędności: {savingsTotal}</h3>
            <button className="add-expense" onClick={openModal}>Dodaj wydatek</button>
            <div className="statictics-details">
            <ExpensesList expenses={budget?.expenses} budgetId={id} />
            <div className="charts">
            <CharStatisticSavings budget={budget.amount} savings={savingsTotal} expenses={expensesTotalAmount} />
            <ChartExpenses kredyt={kredytAmount} zakupy={zakupyAmount} rachunki={rachunkiAmount} paliwo={paliwoAmount} />
            </div>
            </div>
            
            {isOpenModal ? <ExpenseModal isOpen={isOpenModal} close={setIsOpenModal} budgetId={id} addExpense={addExpense} /> : null}
            <Link to={"/"}>Powrót na stronę główną</Link>
        </main>
    )
}

export default BudgetPage
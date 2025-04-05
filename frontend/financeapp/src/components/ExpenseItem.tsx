import { useState } from "react";
import "../styles/ExpenseItem.css"
import useBudgets from "../hooks/useBudgets";
import useExpenses from "../hooks/useExpenses";


const ExpenseItem = (props:any) => {
    const [error,setError] = useState("")
    
    const handleDeleteExpense = () => props.remove.mutateAsync(props.data.id)
    
   
    return(
        <div className="expense-item">
            <h2 className="expense-item-desc">{props.data.description}</h2>
            <h3 className="expense-item-price">{props.data.amount} zł</h3>
            <button className="btn-delete" onClick={handleDeleteExpense}>Delete</button>
        </div>
    )
}

export default ExpenseItem
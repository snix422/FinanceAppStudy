import { useState } from "react";
import "../styles/ExpenseItem.css"
import useBudgets from "../hooks/useBudgets";


const ExpenseItem = (props:any) => {
    const [error,setError] = useState("")
    const {removeBudget} = useBudgets();

    const handleDeleteExpense = () => removeBudget.mutateAsync(props.data.id)
    
   
    return(
        <div className="expense-item">
            <h2 className="expense-item-desc">{props.data.description}</h2>
            <h3 className="expense-item-price">{props.data.amount} zł</h3>
            <button className="btn-delete" onClick={handleDeleteExpense}>Delete</button>
        </div>
    )
}

export default ExpenseItem
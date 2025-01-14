import { useState } from "react";
import "../styles/ExpenseItem.css"


const ExpenseItem = (props:any) => {
    const [error,setError] = useState("")

    
    const deleteExpense = async () => {
        try {
            const response = await fetch(`http://localhost:5054/api/${props.budgetId}/expense/${props.data.id}`,{
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
            props.refreshBudgets();
        } catch (error) {
            setError("Wystąpił problem z logowaniem")
            console.log(error)
        }
    }
    return(
        <div className="expense-item">
            <h2 className="expense-item-desc">{props.data.description}</h2>
            <h3 className="expense-item-price">{props.data.amount} zł</h3>
            <button className="btn-delete" onClick={deleteExpense}>Delete</button>
        </div>
    )
}

export default ExpenseItem
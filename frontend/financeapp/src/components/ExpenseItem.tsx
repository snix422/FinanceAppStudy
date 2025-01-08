import { useState } from "react";

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
        <div>
            <h2>{props.data.description}</h2>
            <h3>{props.data.amount} zł</h3>
            <button onClick={deleteExpense}>Delete</button>
        </div>
    )
}

export default ExpenseItem
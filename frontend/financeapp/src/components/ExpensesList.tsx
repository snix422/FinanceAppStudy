import ExpenseItem from "./ExpenseItem"
import "../styles/ExpensesList.css"

const ExpensesList = (props:any) => {
    return(
        <div className="expenses-container">
            <div className="expenses-list">
            {props.expenses.map((e:any)=>{
                return(<ExpenseItem data={e} budgetId={props.budgetId} refreshBudgets={props.refreshBudgets} remove={props.remove} />)
            })}
            </div>
        </div>
    )
}

export default ExpensesList
import ExpenseItem from "./ExpenseItem"

const ExpensesList = (props:any) => {
    return(
        <div>
            {props.expenses.map((e:any)=>{
                return(<ExpenseItem data={e} budgetId={props.budgetId} refreshBudgets={props.refreshBudgets} />)
            })}
        </div>
    )
}

export default ExpensesList
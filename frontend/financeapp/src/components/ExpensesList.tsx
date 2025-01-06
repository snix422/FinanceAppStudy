import ExpenseItem from "./ExpenseItem"

const ExpensesList = (props:any) => {
    return(
        <div>
            {props.expenses.map((e:any)=>{
                return(<ExpenseItem data={e} />)
            })}
        </div>
    )
}

export default ExpensesList
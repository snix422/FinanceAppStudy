import UserItem from "./UserItem"
import "../styles/BudgetsList.css"

const UsersList = (props:any) => {
    return(
        <div className="budgets-container">
            <div className="budgets-list">
            {props.users.map((u:any)=> <UserItem data={u} />)}
            </div>
        </div>
    )
}

export default UsersList
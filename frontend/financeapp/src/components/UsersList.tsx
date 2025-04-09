import UserItem from "./UserItem"
import "../styles/BudgetsList.css"
import { IUser } from "../types/Types"

interface UsersListProps {
    users: IUser[]
}

const UsersList : React.FC<UsersListProps> = ({users}) => {
    return(
        <div className="budgets-container">
            <div className="budgets-list">
            {users.map((u:any)=> <UserItem data={u} />)}
            </div>
        </div>
    )
}

export default UsersList
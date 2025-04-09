import { useState } from "react"
import BudgetsList from "./BudgetsList"
import BudgetModal from "./BudgetModal"
import "../styles/UserView.css"
import useBudgets from "../hooks/useBudgets"
import useUsers from "../hooks/useUsers"

const UserView = () => {

        const [isOpenModal, setIsOpenModal] = useState(false)
        const {budgets} = useBudgets();
        const {users, isLoading, error} = useUsers();
    console.log(users)
        console.log(budgets)
        const toggleModal = () => {
            setIsOpenModal(prev => !prev);
        }
        
    return(
        <main className="userview-page">
        {budgets ? <div className="userview-container">
            <h2 className="userview-title">Twoje budżety</h2>
            <BudgetsList budgets={budgets} />
        </div> : <h2 className="no-budgets-title">Brak budżetów</h2>}
        <BudgetModal isOpen={isOpenModal} closeModal={setIsOpenModal} />
        <button className="add-budget-button" onClick={toggleModal}>Dodaj budżet</button>
    </main>
    )
}

export default UserView
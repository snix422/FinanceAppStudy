import { useEffect, useState } from "react";
import useBudgets from "../hooks/useBudgets";

const BudgetItemPanel = () => {

    const {budgets,isLoading,error} = useBudgets();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false) 

   

    const toggleModal = () => {
        setIsOpenModal(prev => !prev)
    }

   return(
    <main>
        {isLoading && <h2>Ładowanie ...</h2>}
        {error && <h2>{error.message}</h2>}
        {!isLoading && !error && <div></div>}
    </main>
   ) 
}

export default BudgetItemPanel
import { Alert, Modal } from "@mui/material"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import "../styles/ExpenseModal.css"
import closeImg from "../assets/close.png"

interface ExpenseInputs {
    description:string,
    amount:string,
    category:string
}

const ExpenseModal = (props:any) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm<ExpenseInputs>()
    const [error,setError] = useState("")

    const ExpenseOptions = {
        description:{
            required:"Opis jest wymagany"
        },
        amount:{
            required:"Kwota jest wymagana"
        },
        category:{
            required:"Kategoria budżetu jest wymagana"
        },
    }

    const onSubmit : SubmitHandler<ExpenseInputs> = async (formData:ExpenseInputs) => {
        setError("")
        const amount = parseFloat(formData.amount.replace(",", "."));
    if (isNaN(amount)) {
        setError("Invalid amount format.");
        return;
    }
        try {
            const response = await fetch(`http://localhost:5054/api/${props.budgetId}/expense/create`,{
                method:"POST",
                headers:{"Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body:JSON.stringify({
                   Description:formData.description,
                   Amount:amount,
                   Category:formData.category
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                setError(errorData);
                return
            }
            const data = await response.json();
            console.log(data);
            reset();
            props.close(false);
            props.refreshExpenses();
        } catch (error) {
            setError("Wystąpił problem z logowaniem")
            console.log(error)
        }
       
        console.log(formData);
    }
    return(
        <Modal className="modal-container" open={props.isOpen}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("description",ExpenseOptions.description)} placeholder="Wpisz opis wydatku" />
            {errors.description?.message ? <Alert>{errors.description.message}</Alert> : null}
            <input type="text" {...register("amount",ExpenseOptions.amount)} placeholder="Wpisz kwotę wydatku" />
            {errors.amount?.message ? <Alert>{errors.amount.message}</Alert> : null}
            <select {...register("category",ExpenseOptions.category)}>
                <option value={"kredyt"}>kredyt</option>
                <option value={"rachunki"}>rachunki</option>
                <option value={"zakupy"}>zakupy</option>
                <option value={"paliwo"}>paliwo</option>
            </select>
            {errors.category?.message ? <Alert>{errors.amount?.message}</Alert> : null}
            <button type="submit">Dodaj wydatek</button>
            <img className="close-img" src={closeImg} alt="close-icon" onClick={()=>props.close(false)} />
        </form>
        </Modal>
    )
}

export default ExpenseModal
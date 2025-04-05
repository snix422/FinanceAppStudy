import { Alert, Modal } from "@mui/material"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import "../styles/ExpenseModal.css"
import closeImg from "../assets/close.png"
import useExpenses from "../hooks/useExpenses"
import { Description } from "@mui/icons-material"

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
    props.addExpense.mutateAsync(
         {
          Description: formData.description,
          Amount: Number(formData.amount),
          Category: formData.category
        }
      );
       
        console.log(formData);
        props.close(false);
    }
    return(
        <Modal className="modal-container" open={props.isOpen}>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("description",ExpenseOptions.description)} placeholder="Wpisz opis wydatku" />
            {errors.description?.message ? <Alert>{errors.description.message}</Alert> : null}
            <input type="text" {...register("amount",ExpenseOptions.amount)} placeholder="Wpisz kwotę wydatku" />
            {errors.amount?.message ? <Alert>{errors.amount.message}</Alert> : null}
            <select  {...register("category",ExpenseOptions.category)}>
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
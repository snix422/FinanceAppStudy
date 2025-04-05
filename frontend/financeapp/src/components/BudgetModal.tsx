import { Modal } from "@mui/material"
import { title } from "process";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import "../styles/BudgetModal.css"
import closeImg from "../assets/close.png"
import useBudget from "../hooks/useBudget";
import useBudgets from "../hooks/useBudgets";

interface BudgetModalInputs {
    title:string,
    price:string,
    startBudget:string,
    endBudget:string
}

const BudgetModal = (props:any) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm<BudgetModalInputs>();
    const [error,setError] = useState("")
    const { addBudget } = useBudgets();

    const BudgetOptions = {
        title:{
            required:"Email jest wymagany"
        },
        price:{
            required:"Hasło jest wymagane"
        },
        startBudget:{
            required:"Data rozpoczęcia budżetu jest wymagana"
        },
        endBudget:{
            required:"Data zakończenia budżetu jest wymagana"
        }
    }

    const onSubmit : SubmitHandler<BudgetModalInputs> = async (formData:BudgetModalInputs) => {
        setError("")
       addBudget.mutateAsync({Title:formData.title,TotalAmount:Number(formData.price),
        StartDate:formData.startBudget,EndDate:formData.endBudget})
       
        console.log(formData);
        props.closeModal()
    }

    return(
        <Modal className="modal-container" open={props.isOpen}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title",BudgetOptions.title)} placeholder="Wpisz nazwę budżetu" />
            <input type="text" {...register("price",BudgetOptions.price)} placeholder="Wpisz kwotę dostępnego budżetu" />
            <input type="date" {...register("startBudget",BudgetOptions.startBudget)} placeholder="Data zaczęcia budżetu" />
            <input type="date" {...register("endBudget",BudgetOptions.endBudget)}placeholder="Data zakończenia budżetu" />
            <button type="submit">Dodaj budżet</button>
            <img className="close-img" src={closeImg} alt="close-icon" onClick={()=>props.closeModal(false)} />
        </form>
        </Modal>
    )
}

export default BudgetModal
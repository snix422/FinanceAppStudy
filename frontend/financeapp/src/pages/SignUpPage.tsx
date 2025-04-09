import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import "../styles/SignUpPage.css"
import { useAuth } from "../hooks/useAuth";


interface SignUpTypeInputs  {
    name: string,
    surname:string,
    email:string,
    password:string,
    confirmPassword:string
}

const SignUpPage = () => {
    const {register, handleSubmit,formState:{errors},reset} = useForm<SignUpTypeInputs>();
    const [registrationError, setRegistrationError] = useState("");
    const context = useAuth();
    const validateOptions = {
        name:{
            required:"Imię jest wymagane"
        },
        surname:{
            required:"Nazwisko jest wymagane"
        },
        email:{
            required:"E-mail jest wymagany"
        },
        password:{
            required:"Hasło jest wymagane"
        },
        confirmPassword:{
            required:"Pole powtórz hasło jest wymagane"
        }
    }

    const onSubmit : SubmitHandler<SignUpTypeInputs> = async (formData:SignUpTypeInputs) => {
        setRegistrationError("")
        if(formData.password !== formData.confirmPassword){
            setRegistrationError("Hasła nie są takie same");
            return
        }
        context.registerUser({email:formData.email,password:formData.password, name:formData.name,surname:formData.surname})
    }
    return (
        <main className="register-page">
            <h1 className="register-title">Rejestracja</h1>
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <input className="input-field" type="text" {...register("name",validateOptions.name)} placeholder="Wpisz swoje imię..." />
                {errors.name?.message ? <span className="error-message">{errors.name?.message}</span> : null}
                <input className="input-field" type="text" {...register("surname",validateOptions.surname)}placeholder="Wpisz swoje nazwisko..." />
                {errors.surname?.message ? <span className="error-message">{errors.surname.message}</span>:null}
                <input className="input-field" type="text" {...register("email",validateOptions.email)}placeholder="Wpisz swój email..." />
                {errors.email?.message ? <span className="error-message">{errors.email.message}</span>:null}
                <input className="input-field" type="text" {...register("password",validateOptions.password)}placeholder="Wpisz swoje hasło..." />
                {errors.password?.message ? <span className="error-message">{errors.password.message}</span>:null}
                <input className="input-field" type="text" {...register("confirmPassword",validateOptions.confirmPassword)}placeholder="Powtórz hasło" />
                {errors.confirmPassword?.message ? <span className="error-message">{errors.confirmPassword.message}</span>:null}
                <button className="submit-button" type="submit">Zarejestruj się</button>
                {registrationError ? <span className="error-message">{registrationError}</span> : null}
            </form>
            <Link className="back-link" to={"/"}>Powrót na stronę główną</Link>
        </main>
    )
}

export default SignUpPage
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom";

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

        try {
            const response = await fetch('http://localhost:5054/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setRegistrationError(errorData.message || "Wystąpił błąd podczas rejestracji");
                return;
            }

            const data = await response.json();
            console.log("Rejestracja zakończona sukcesem", data);
            reset();
        } catch (error) {
            console.error("Błąd podczas rejestracji:", error);
            setRegistrationError("Nie udało się połączyć z serwerem. Spróbuj ponownie później.");
        }
        console.log(formData);
    }
    return (
        <main>
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("name",validateOptions.name)} placeholder="Wpisz swoje imię..." />
                {errors.name?.message ? <span>{errors.name?.message}</span> : null}
                <input type="text" {...register("surname",validateOptions.surname)}placeholder="Wpisz swoje nazwisko..." />
                {errors.surname?.message ? <span>{errors.surname.message}</span>:null}
                <input type="text" {...register("email",validateOptions.email)}placeholder="Wpisz swój email..." />
                {errors.email?.message ? <span>{errors.email.message}</span>:null}
                <input type="text" {...register("password",validateOptions.password)}placeholder="Wpisz swoje hasło..." />
                {errors.password?.message ? <span>{errors.password.message}</span>:null}
                <input type="text" {...register("confirmPassword",validateOptions.confirmPassword)}placeholder="Powtórz hasło" />
                {errors.confirmPassword?.message ? <span>{errors.confirmPassword.message}</span>:null}
                <button type="submit">Zarejestruj się</button>
                {registrationError ? <span>{registrationError}</span> : null}
            </form>
            <Link to={"/"}>Powrót na stronę główną</Link>
        </main>
    )
}

export default SignUpPage
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

interface SignInTypeInputs {
    email:string,
    password:string
}

const SignInPage = () => {
    const {register, handleSubmit,formState:{errors},reset} = useForm<SignInTypeInputs>();
    const [loginError, setLoginError] = useState("");
    const loginOptions = {
        email:{
            required:"Email jest wymagany"
        },
        password:{
            required:"Hasło jest wymagane"
        }
    }

    const navigate = useNavigate();

    const onSubmit : SubmitHandler<SignInTypeInputs> = async (formData:SignInTypeInputs) => {
        setLoginError("")
        try {
            const response = await fetch("http://localhost:5054/api/auth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                   
                    email:formData.email,
                    password:formData.password
                    
                })
            })

            if(!response.ok){
                const errorData = await response.json();
                setLoginError(errorData);
                return
            }
            const data = await response.json();
            const { token, name, role } = data;

            console.log(data);

            // Zapisz token i inne dane w localStorage jako JSON
            localStorage.setItem("authToken", token);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                    name,
                    role,
                })
            );
            navigate("/")
            reset();
        } catch (error) {
            setLoginError("Wystąpił problem z logowaniem")
            console.log(error)
        }
       
        console.log(formData);
    }

    return(
        <main>
            <h1>Logowanie</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("email",loginOptions.email)} placeholder="Wpisz swój email..." />
                {errors.email?.message ? <span>{errors.email.message}</span>:null}
                <input type="text" {...register("password",loginOptions.password)} placeholder="Wpisz swoje hasło..." />
                {errors.password?.message ? <span>{errors.password.message}</span>:null}
                <button type="submit">Zaloguj się</button>
            </form>
            <Link to={"/"}>Powrót na stronę główną</Link>
        </main>
    )
}

export default SignInPage
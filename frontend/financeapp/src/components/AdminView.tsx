import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import "../styles/AdminView.css"

const AdminView = () => {

    const [users,setUsers] = useState([])
    const [error, setError] = useState("")
    
    const fetchUsers = async () => {
               
    const token = localStorage.getItem("authToken");
                         
    if (!token) {
        setError("Brak tokenu uwierzytelniającego. Zaloguj się ponownie.");
        return;
    }
            
    try {
        const response = await fetch('http://localhost:5054/users', {
            method: 'GET',
            });
            
        if (!response.ok) {
            if (response.status === 401) {
                setError("Nieautoryzowany dostęp. Zaloguj się ponownie.");
            } else {
                setError("Problem z pobraniem budżetów.");
            }
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
        const data = await response.json();
        setUsers(data); 
    } catch (error) {
        console.error("Błąd podczas pobierania budżetów:", error);
        setError("Problem z wczytaniem budżetu.");
    }
    };
            
    useEffect(() => {
        fetchUsers();
    }, []);
        
    console.log(users);      
    return(
        <div className="admin-page">
            <h2 className="admin-title">Lista użytkowników</h2>
            <UsersList users={users} />
        </div>
    )
}

export default AdminView
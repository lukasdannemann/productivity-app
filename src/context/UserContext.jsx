import { createContext, useState } from "react";

export const UserContext = createContext()

export default function UserProvider({children}){

    const [users, setUsers] = useState( () => {
        return JSON.parse(localStorage.getItem('users')) || []
    })

    const [user, setUser] = useState(() => {
        return JSON.parse(sessionStorage.getItem('user')) || null
    })


    const registerUser = (username, password) => {

        newUser = {
            id: Date.now().toString(),
            username,
            password
        }

        setUsers(...users, newUser)
        localStorage.setItem('users', JSON.stringify(users))
    }

    const loginUser = (username, password) => {
        const foundUser = users.find(user => 
            user.username === username && user.password === password
        )
        setUser(foundUser)
        sessionStorage.setItem('user', JSON.stringify(foundUser))
        return true;
    }

    const logoutUser = () => {
        setUser(null)
        sessionStorage.removeItem('user')
    }

    
    return(
        <UserContext value={{users, user, registerUser, loginUser, logoutUser}}>
            {children}
        </UserContext>
    )
}
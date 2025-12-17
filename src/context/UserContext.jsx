import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export default function UserProvider({children}){

    const [users, setUsers] = useState( () => {
        return JSON.parse(localStorage.getItem('users')) || []
    })

    const [currentUser, setCurrentUser] = useState(() => {
        return JSON.parse(sessionStorage.getItem('currentUser')) || null
    })

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])

    useEffect(() => {
        if (currentUser){
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
        } else{
            sessionStorage.removeItem('currentUser')
        }
    }, [currentUser])


    const registerUser = (username, password) => {

        if (!username || !password){
            return {success: false, message: 'Please fill in all fields'};
        }

        if (users.find(user => user.username === username)){
            return {success: false, message: 'Username already exists'}
        }

        const newUser = {
            id: Date.now().toString(),
            username,
            password
        }
            
        setUsers([...users, newUser])
        setCurrentUser(newUser)
        return {success: true, user: newUser}
        }

    const loginUser = (username, password) => {
        const foundUser = users.find(user => 
            user.username === username && user.password === password
        )
        if (!foundUser){
            return {success: false, message: 'Wrong username or password'}
        }
        setCurrentUser(foundUser)
        return {success: true, user: foundUser};
    }

    const logoutUser = () => {
        setCurrentUser(null)
    }

    
    return(
        <UserContext value={{users, currentUser, registerUser, loginUser, logoutUser}}>
            {children}
        </UserContext>
    )
}
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function PrivateRoute({children}){
    const {currentUser} = useContext(UserContext)

    if (!currentUser){
        return <Navigate to='/' replace />
    }else{
        return children
    }
}
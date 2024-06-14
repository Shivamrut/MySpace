import { useState } from "react"
import AuthContext from "./AuthContext"

const AuthState = (props)=>{
    const host = "http://localhost:8080/api"
    const [token,setToken] = useState("")
    const [logged,setLogged] = useState(false)

    const login = async (user)=>{
        const {email,password} = user
        const res = await fetch(`${host}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ email,password })
        })
        let stat = await res.json()
        if(stat.success){
            setLogged(true)
            setToken(stat.token)
            return true;
        }
        else{
            console.log("error logging in");
            return false;
        }
        
    }
    const register = async (user)=>{
        const {username,email,password} = user
        const res = await fetch(`${host}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json "
            },
            body: JSON.stringify({username, email,password })
        })
        let stat = await res.json()
        if(stat.success){
            setLogged(true)
            setToken(stat.token)
            return true;
        }
        else{
            console.log("Could not register!");
            return false;
        }
        
    }

    return <AuthContext.Provider value={{logged,token, setLogged,login,register}}>
         {props.children}
    </AuthContext.Provider>
    
}

export default AuthState
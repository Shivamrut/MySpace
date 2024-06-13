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
        }
        else{
            console.log("error logging in");
        }
        
    }

    return <AuthContext.Provider value={{login}}>
         {props.children}
    </AuthContext.Provider>
    
}

export default AuthState
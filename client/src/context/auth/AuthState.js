import AuthContext from "./AuthContext"

export const AuthState = (props) => {
    const host = "http://localhost:8080/api"

    const login = async (user) => {
        const { email, password } = user
        const res = await fetch(`${host}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ email, password })
        })
        let stat = await res.json()
        if (stat.success) {
            localStorage.setItem("token", stat.token)
            localStorage.setItem("username", stat.username)
            return { success: true, error: null }
        }
        else {
            return { success: false, error: stat.error }
        }

    }
    const register = async (user) => {
        const { username, email, password } = user
        const res = await fetch(`${host}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json "
            },
            body: JSON.stringify({ username, email, password })
        })
        let stat = await res.json()
        if (stat.success) {
            localStorage.setItem("token", stat.token)
            localStorage.setItem("username", stat.username)
            return { success: true, error: null }
        }
        else {
            return { success: false, error: stat.error }
        }

    }

    return <AuthContext.Provider value={{ login, register }}>
        {props.children}
    </AuthContext.Provider>

}
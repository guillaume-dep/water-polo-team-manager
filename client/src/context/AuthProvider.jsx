import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext.jsx"
import { getMe } from '../api/auth.js'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await getMe() /* AxiosResponse */
                setUser(res)
            }
            catch {
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        }

        loadUser()
    }, [])

    return <AuthContext.Provider value={{ user, setUser, loading }} >
        {children}
    </AuthContext.Provider >
}
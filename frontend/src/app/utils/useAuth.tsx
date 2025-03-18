import { useState } from "react"

export const useAuth = () => {
    const [isAuth, setIsAuth] = useState<boolean>((!!localStorage.getItem('authToken')))

    return { isAuth, setIsAuth };
}
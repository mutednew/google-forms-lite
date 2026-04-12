import { useLocation } from "react-router-dom"

interface UseHeaderReturn {
    isHome: boolean
    isFormBuilder: boolean
}

export const useHeader = (): UseHeaderReturn => {
    const location = useLocation()

    return {
        isHome: location.pathname === "/",
        isFormBuilder: location.pathname === "/forms/new",
    }
}

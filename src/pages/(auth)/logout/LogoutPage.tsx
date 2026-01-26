import { useEffect } from "react"
import { useNavigate } from "react-router"

const LogoutPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/")
    }, [])
    return null
}

export default LogoutPage
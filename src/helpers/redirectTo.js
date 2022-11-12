import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

export const redirectTo = (path) => {
    const timerTimeout = setTimeout(()=>{
        navigate(path);
        return () => clearTimeout(timerTimeout);
    },2000)
}
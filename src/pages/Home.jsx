import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Admin from "../components/Admin"
import Candidate from "../components/Candidate"


const Home = () => {

    let URL = process.env.REACT_APP_URL

    let user = localStorage.getItem("user")
    let navigate = useNavigate();

    const [currentuser, setcurretuser] = useState("");

    async function postData(url = "") {
        const response = await fetch(`${URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("user")
            },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }


    const getuser = async () => {
        let user = await postData("user")
        setcurretuser(user.message)
        
    }


    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        getuser()
    }, [])

    return (
        <>
            {currentuser.role == 0 ? <Admin currentuser={currentuser}/> : <Candidate  currentuser={currentuser} />}
        </>
    )
}

export default Home
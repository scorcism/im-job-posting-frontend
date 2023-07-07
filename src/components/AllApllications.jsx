import { useEffect, useState } from "react";



const AllApllications = () => {
    let URL = process.env.REACT_APP_URL

    const [applications, setApplications] = useState([]);

    async function getData(url = "" ) {
        const response = await fetch(`${URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("user")
            },
        });
        return response.json();
    }

    const getApplications = async () =>{
        let res = await getData('applicant')
        
        setApplications(res.message)
    }

    useEffect(()=>{
        getApplications();
    },[])

    if(applications){
        console.log(applications)
    }

    return (
        <>

        </>
    )
}

export default AllApllications
import { useEffect, useState } from "react"


const AllListings = () => {
    let URL = process.env.REACT_APP_URL

    const [allListings, setAllListings] = useState([]);

    async function getData(url = "", ) {
        const response = await fetch(`${URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("user")
            },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const fetchData = async () =>{
        let res = await getData("joblistings")
        if(res.status == 0){
            alert(res.message);
        }else if(res.status==1){
            setAllListings(res)
        }
    }

    useEffect(()=>{
        fetchData();
    },[])


    return (
        <>
            All Listings

        </>
    )
}

export default AllListings
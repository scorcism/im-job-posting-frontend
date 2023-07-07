import { useEffect, useState } from "react"
import JobCard from "./JobCard";


const AllListings = () => {
    let URL = process.env.REACT_APP_URL

    const [allListings, setAllListings] = useState([]);

    async function getData(url = "",) {
        const response = await fetch(`${URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("user")
            },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const fetchData = async () => {
        let res = await getData("joblistings")
        if (res.status == 0) {
            alert(res.message);
        } else if (res.status == 1) {
            setAllListings(res.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    // console.log(allListings)

    return (
        <>
            <h2>All Listings</h2>
            <div className="flex flex-wrap flex-row justify-center align-middle">
                    {
                        allListings && allListings.map((jobs)=>{
                            return <JobCard jobs={jobs}/>
                        })
                    }
            </div>

        </>
    )
}

export default AllListings
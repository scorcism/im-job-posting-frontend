import { useEffect, useState } from "react";

const Type = () => {

    let URL = process.env.REACT_APP_URL

    const [name, setName] = useState("");

    async function postData(url = "", data = {}) {
        const response = await fetch(`${URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("user")
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
    async function getData(url = "") {
        const response = await fetch(`${URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("user")
            },
        });
        let data = await response.json();
        return data;
    }

    const submitform = async () => {
        console.log(category)
        let res = await postData("jobtype", { name, categoryId: category });
        if (res.status == 0) {
            alert(res.message)
            return;
        } else if (res.status == 1) {
            alert(res.message);
            setName("")
            setCategory("")
        }
    }

    // get all categories first
    const [cato, setCato] = useState([]);
    const [category, setCategory] = useState(
        ""
    );

    const getCato = async () => {
        let res = await getData("admincategory")
        setCato(res.message)
    }

    useEffect(() => {
        
            getCato();
        
    }, [])

    // if(cato){
    //     console.log(cato)
    // }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-[400px] overflow-hidden mb-3">
                <div className="w-full m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-xl font-semibold text-center text-purple-700 underline">
                        Add Job Type
                    </h1>
                    <div className="mb-2">
                            <label className="mr-5">Select Category</label>
                            <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                                <option defaultChecked>Choose</option>
                                {
                                    cato && cato.map((opt) => {
                                        
                                        return <option value={opt._id}>{opt.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    <div className="mt-1">

                        <div className="mb-2">
                            <label
                                for="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Name
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="email" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }}
                            />
                        </div>
                        
                        <div className="">
                            <button onClick={submitform} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Submit data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Type
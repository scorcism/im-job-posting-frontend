import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AllListings from "./AllListings";

const Candidate = ({ currentuser }) => {
    let URL = process.env.REACT_APP_URL

    const [step1, setstep1] = useState({
        name: "",
        email: currentuser.email,
        experience: "",
        salary: ""
    })

    const [showStep1, setShowStep1] = useState(false)

    let navigate = useNavigate();

    const handleOnChange = (e) => {
        setstep1({ ...step1, [e.target.name]: e.target.value })
    }

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

    if (showStep1) {
        console.log(showStep1)
    }


    const submitform = async () => {
        if (step1.name.length < 5 || step1.experience.length < 1 || step1.salary.length < 1) {
            alert("check name > 5")
            return;
        }

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (validateEmail(step1.email)) {
            let res = await postData("candidate", step1);
            if (res.status == 1) {
                alert(res.message)
                localStorage.setItem("showform", false)
                setShowStep1(false);
            } else if (res.status == 0) {
                alert(res.message)
            }
        } else if (!validateEmail(step1.email)) {
            alert("Email format incorrect")
            return;
        }
    }
    useEffect(() => {
        let toshow = localStorage.getItem("showform");
        if (toshow === "false") {
            setShowStep1(false)
        }else{
            setShowStep1(true)
        }
    }, [])

    return (
        <>
            <div>
                <div className="text-red-800 text-left p-2 bg-gray-300">
                    {"Hello "}{currentuser.email}
                </div>

                {showStep1 ?
                    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                                Enter user data
                            </h1>
                            <div className="mt-6">

                                <div className="mb-2">
                                    <label
                                        for="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="name" value={step1.name} onChange={handleOnChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        for="email"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="email" value={step1.email} onChange={handleOnChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        for="experince"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        YOExperience
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="experience" value={step1.experience} onChange={handleOnChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        for="experince"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Salary Expected
                                    </label>
                                    <input
                                        type="text"
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="salary" value={step1.salary} onChange={handleOnChange}
                                    />
                                </div>
                                <div className="mt-6">
                                    <button onClick={submitform} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                        Submit data
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div>
                        <AllListings/>
                    </div>
                }


            </div>
        </>
    )
}

export default Candidate
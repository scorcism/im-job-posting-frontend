
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    let URL = process.env.REACT_APP_URL

    const [userCred, setUserCred] = useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate();



    const handleOnChange = (e) => {
        setUserCred({ ...userCred, [e.target.name]: e.target.value })
    }

    async function postData(url = "", data = {}) {
        const response = await fetch(`${URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const submitform = async () => {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (userCred.password.length < 5) {
            alert("Password should be > 5")
        }

        if (validateEmail(userCred.email)) {
            // valid email 
            let email = userCred.email;
            let password = userCred.password;
            let res = await postData("login", {  email, password })
            // console.log(res)
            if (res.status == 0) {
                alert(res.message)
            } else if (res.status == 1) {
                localStorage.setItem("user", res.message)
                if(!localStorage.getItem("showform")){
                    localStorage.setItem("showform", true)
                }
                navigate("/")
            }

        } else if (!validateEmail(userCred.email)) {
            // in valid email
            alert("Enter valid email")
        }

    }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                        Login
                    </h1>
                    <div className="mt-6">
                        
                        <div className="mb-2">
                            <label
                                for="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="email" value={userCred.email} onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="password" value={userCred.password} onChange={handleOnChange}
                            />
                        </div>
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6">
                            <button onClick={submitform} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Login
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-purple-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
export default Login
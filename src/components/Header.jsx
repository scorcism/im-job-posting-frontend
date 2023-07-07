import { Link, useNavigate } from "react-router-dom"


const Header = () => {

    let user = localStorage.getItem("user")
    let navigate = useNavigate();
    return (
        <>
            <nav class="flex items-center justify-between flex-wrap bg-teal p-6 bg-gray-700 text-white">
                <div class="flex items-center flex-no-shrink text-white mr-6">

                    <Link to="/" class="font-semibold text-xl tracking-tight">scor32k</Link>
                </div>

                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">

                    </div>
                    <div>
                        {
                            user ?
                                <p class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-red-900  bg-red-700 cursor-pointer hover:text-teal mt-4 ml-2 lg:mt-0" title="Logout" onClick={()=>{
                                    localStorage.removeItem("user")
                                    navigate("/login")
                                }}>Logout</p>
                                :
                                <>
                                    <Link to="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white  hover:text-teal mt-4 ml-2 lg:mt-0">Login</Link>
                                    <Link to="/register" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white  hover:text-teal mt-4 ml-2 lg:mt-0">Register</Link>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header
import { Link } from "react-router-dom"


const Header = () => {
    return (
        <>
            <nav class="flex items-center justify-between flex-wrap bg-teal p-6 bg-gray-700 text-white">
                <div class="flex items-center flex-no-shrink text-white mr-6">
                    
                    <span class="font-semibold text-xl tracking-tight">scor32k</span>
                </div>
                
                <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                        
                    </div>
                    <div>
                        <Link to="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white  hover:text-teal mt-4 ml-2 lg:mt-0">Login</Link>
                        <Link to="/register" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white  hover:text-teal mt-4 ml-2 lg:mt-0">Register</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Header
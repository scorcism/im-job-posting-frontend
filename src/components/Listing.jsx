import { useEffect, useState } from "react";


const Listing = ({ currentuser }) => {
    let URL = process.env.REACT_APP_URL

    /**
        title -> String
        companydetails.name
        companydetails.established
        tags -> array of string
        skills -> array of string
        experiencereq -> Number
        description -> String
        salary -> Number
     */

    const [cred, setCred] = useState({
        title: "",
        description: "",
        experiencereq: "",
        salary: "",
    });

    const [companydetails, setCompanydetails] = useState({
        name: "",
        established: ""
    })

    const handleOnChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    const handleOnChange2 = (e) => {
        setCompanydetails({ ...companydetails, [e.target.name]: e.target.value })
    }

    // get all categories first
    const [cato, setCato] = useState([]);
    const [types, setTypes] = useState([]);
    const [category, setCategory] = useState(
        ""
    );
    const [type, setType] = useState("")
    const [tagsString, setTagsString] = useState();
    const [skillsString, setSkillsString] = useState();

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

        let tags = tagsString.replace(/\s/g, '')
        let skills = skillsString.replace(/\s/g, '')

        let res = await postData("joblisting", {
            jobCategoryId: category, jobTypeId: type, title: cred.title, companydetails: companydetails, tags: tags, skills: skills, experiencereq: cred.experiencereq, description: cred.description, salary: cred.salary
        })

        if (res.status == 0) {
            alert(res.message)
        } else if (res.status == 1) {
            alert(res.message)
        }
    }

    const getCato = async () => {
        let res = await getData("admincategory")
        setCato(res.message)
    }

    const getTypes = async () => {
        let res = await postData("adminjobtype", { categoryId: category })
        setTypes(res.message)
    }


    useEffect(() => {
        getCato();
    }, [])

    useEffect(() => {
        if (category) {
            getTypes();
        }
    }, [category])

    // if(cato){
    //     console.log(cato)
    // }

    return (
        <>
            <div className="relative flex flex-col justify-center min-h-[400px] overflow-hidden mb-3">
                <div className="w-full m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-xl font-semibold text-center text-purple-700 underline">
                        Add Job Listing
                    </h1>
                    <div className="mt-1">
                        <div className="mb-3">
                            <label className="mr-5 block text-sm font-semibold text-gray-800">Select Category</label>
                            <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                                <option defaultChecked>Choose</option>
                                {
                                    cato && cato.map((opt) => {

                                        return <option value={opt._id}>{opt.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-5">
                            <label className="mr-5 block text-sm font-semibold text-gray-800">Select Job Type</label>
                            <select value={category} onChange={(e) => setType(e.target.value)}>
                                <option defaultChecked>Choose</option>
                                {
                                    (types && types.length != 0) && types.map((opt) => {

                                        return <option value={opt._id}>{opt.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="mb-2">
                            <label
                                for="title"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="title" value={cred.title} onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Company name
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="name" value={companydetails.name} onChange={handleOnChange2}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Company established date
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="established" value={companydetails.established} onChange={handleOnChange2}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Tags - comma seperated
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="tags" value={tagsString} onChange={(e) => setTagsString(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Skills - comma seperated
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="skills" value={skillsString} onChange={(e) => setSkillsString(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Experience Required
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="experiencereq" value={cred.experiencereq} onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="description" value={cred.description} onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="companyname"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Salary
                            </label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" name="salary" value={cred.salary} onChange={handleOnChange}
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

export default Listing


const JobCard = (props) => {
    props = props.jobs
    let URL = process.env.REACT_APP_URL

    async function postData(url = "", data = {}) {
        const response = await fetch(`${URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("user")
            },
            body: JSON.stringify(data),
        });
        return response.json(); 
    }

    const apply = async () =>{
        let adminId = props.adminId;
        let jobCategoryId = props.jobCategoryId;
        let jobTypeId = props.jobTypeId;
        let jobListingId = props._id;
        let res = await postData("applicant", {adminId, jobCategoryId, jobTypeId, jobListingId})

        if(res.status==0){
            alert(res.message);
        }else if(res.status==1){
            alert(res.message)
        }
    }

    return (
        <>
            <div>
                <div className="max-w-xs h-64 flex flex-col justify-between bg-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4 ml-3">
                    <div>
                        <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{props.title}</h4>
                        <p className="text-gray-800 dark:text-gray-100 text-sm">not showing entire has time was less.</p>
                    </div>
                    <button onClick={apply} className="bg-gray-500 py-2 px-3 text-white  font-semibold">Apply</button>
                </div>
            </div>

        </>
    )
}

export default JobCard
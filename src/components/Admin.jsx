import { useState } from "react"
import Category from "./Category";
import Type from "./Type";
import Listing from "./Listing";
import AllApllications from "./AllApllications";


const Admin = ({ currentuser }) => {

    const [showCat, setShowCat] = useState(false);
    const [showType, setShowType] = useState(false);
    const [showListing, setShowListing] = useState(false);
    const [showAllApplications, setShowAllApplications] = useState(false);

    return (
        <>
            <div className="flex flex-row bg-gray-300">
                <p className="py-1 px-3 mx-3 my-3 bg-red-400 border border-black" onClick={() => {
                    setShowCat((prev) => !prev);
                    setShowType(false);
                    setShowListing(false);
                    setShowAllApplications(false);
                }}>Add Job Category</p>
                <p className="py-1 px-3 mx-3 my-3 bg-red-400 border border-black" onClick={() => {
                    setShowType((prev) => !prev)
                    setShowCat(false)
                    setShowListing(false)
                    setShowAllApplications(false)
                }}>Add Job Type</p>
                <p className="py-1 px-3 mx-3 my-3 bg-red-400 border border-black" onClick={() => {
                    setShowType(false)
                    setShowCat(false)
                    setShowAllApplications(false)
                    setShowListing((prev) => !prev)
                }}>Add Job Listings</p>
                <p className="py-1 px-3 mx-3 my-3 bg-red-400 border border-black" onClick={() => {
                    setShowType(false)
                    setShowCat(false)
                    setShowListing(false)
                    setShowAllApplications((prev) => !prev)
                }}>All Applications</p>
            </div>

            {
                showCat && <Category />
            }

            {
                showType && <Type />
            }

            {
                showListing && <Listing currentuser={currentuser} />
            }
            {
                showAllApplications && <AllApllications/>
            }

        </>
    )
}

export default Admin
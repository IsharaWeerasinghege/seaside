import React, {useEffect, useState} from 'react';
import FeedbackTable from "../tables/FeedbackTable";
import axios from "axios";
import {Pagination} from "@material-ui/lab";

const Feedback = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [feedbacks, setfeedbacks] = useState([]);

    useEffect(() => {
        if(!isLoaded) {
            async function getFeedbacks() {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/feedback/list`, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })

                    setfeedbacks(response.data);
                    setIsLoaded(true);
                } catch (error) {
                    console.log(error)
                }
            }
            getFeedbacks();
        }
    }, [resolveFeedback]);

    async function resolveFeedback(id, email, status) {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/feedback/update/${id}`, {status}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            let subject;

            if (status === 'resolved') {
                subject = 'Your feedback has been resolved';
            } else {
                subject = 'Your feedback has been rejected';
            }
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
            setIsLoaded(false);
        } catch (error) {
            console.log(error)
        }

    }

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    // Get current posts
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
            <FeedbackTable tableData={currentItems} resolveFeedback={resolveFeedback}/>
            <div
                className="flex flex-col items-center justify-center bg-white px-4 pt-2 border-t border-gray-200 sm:px-6"
            >
                <Pagination size={'small'} count={Math.ceil(feedbacks.length / postsPerPage)} page={currentPage}
                            onChange={(e, value) => paginate(value)}/>
            </div>
        </div>
    )
}

export default Feedback;
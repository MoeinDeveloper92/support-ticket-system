import React from 'react'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"


const Home = () => {
    return (
        <>
            <section className="heading">
                <h1>What Do You Need Help With?</h1>
                <p>Please Choose From An Option Below!</p>
            </section>


            <Link to={"/new-ticket"} className='btn btn-reverse btn-block'>
                <FaQuestionCircle />Create New Ticket
            </Link>
            <Link to={"/tickets"} className='btn btn-block'>
                <FaTicketAlt />View My Tickets
            </Link>
        </>
    )
}

export default Home
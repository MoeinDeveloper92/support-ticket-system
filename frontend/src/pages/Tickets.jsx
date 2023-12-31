import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import { motion } from "framer-motion"
const Tickets = () => {

    const { tickets, isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    //clear state on unmount
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={"/"} />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}

                >
                    {tickets.map((ticket) => (
                        <TicketItem key={ticket._id} ticket={ticket} />
                    ))}
                </motion.div>

            </div>
        </>
    )
}

export default Tickets
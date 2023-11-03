import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset, getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'


const Ticket = () => {
    const { isLoading, ticket, isSuccess, isError, message } = useSelector((state) => state.ticket)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const params = useParams()

    //destructure from params
    const { ticketId } = params


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [isError, message, dispatch, ticketId])

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something went wrong!!!</h3>
    }

    //Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success("ticket has been closed.")
        navigate("/tickets")
    }
    return (
        <>
            <div className="ticket-page">
                <header className="ticket-header">
                    <BackButton url={"/tickets"} />
                    <h2>
                        Ticket ID: {ticket._id}
                        <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                    </h2>
                    <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                    <h3>Product: {ticket.product}</h3>
                    <hr />
                    <div className="ticket-desc">
                        <h3>Description of Issue</h3>
                        <p>{ticket.description}</p>
                    </div>
                </header>
                {/* we want to show the button if only it is not closed */}
                {ticket.status !== 'closed' && (
                    <button onClick={onTicketClose} className='btn btn-danger btn-block'>Close Ticket</button>
                )}
            </div>
        </>
    )
}

export default Ticket
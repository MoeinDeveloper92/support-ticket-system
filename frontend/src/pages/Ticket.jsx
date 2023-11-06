import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from "../features/notes/noteSlice"
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const Ticket = () => {
    const { isLoading, ticket, isSuccess, isError, message } = useSelector((state) => state.ticket)

    const { isLoading: noteIsLoading, notes } = useSelector((state) => state.note)
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
        dispatch(getNotes(ticketId))
    }, [isError, message, dispatch, ticketId])

    if (isLoading || noteIsLoading) {
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
                    <h2>Notes</h2>
                </header>

                {notes.map((note) => (
                    <NoteItem key={note._id} note={note} />
                ))}
                {/* we want to show the button if only it is not closed */}
                {ticket.status !== 'closed' && (
                    <button onClick={onTicketClose} className='btn btn-danger btn-block'>Close Ticket</button>
                )}

            </div>
        </>
    )
}

export default Ticket
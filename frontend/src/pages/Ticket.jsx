import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesReset } from "../features/notes/noteSlice"
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import Modal from "react-modal"
import { FaPlus } from 'react-icons/fa'
import { motion } from 'framer-motion'

const customStyle = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        position: 'relative'
    }
}


Modal.setAppElement('#root')

const Ticket = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState("")
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

    //open the modal
    const openModal = () => {
        setModalIsOpen(true)
    }
    //close the modal
    const closeModal = () => {
        setModalIsOpen(false)
    }

    const onNoteSubmit = (e) => {
        e.preventDefault()

        dispatch(createNote({ ticketId, noteText }))
        closeModal()
    }
    return (
        <motion.div
            initial={{
                x: "-100%"
            }}
            animate={{
                x: '0'
            }}

        >
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
                {ticket.status !== 'closed' && (<>
                    <button onClick={openModal} className='btn '><FaPlus />Add Note</button>
                </>)}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyle}
                    contentLabel='Add Note'

                >
                    <h2>Add Note </h2>
                    <button className="btn-close" onClick={closeModal}>X</button>
                    <form onSubmit={onNoteSubmit} >
                        <div className="form-group">
                            <textarea
                                name="noteText"
                                id="noteText"
                                className='form-control'
                                value={noteText}
                                placeholder='Note Text'
                                onChange={(e) => setNoteText(e.target.value)}
                            >

                            </textarea>
                        </div>

                        <div className="form-group">
                            <button type='submit' className='btn'>Submit</button>
                        </div>
                    </form>
                </Modal>
                {notes.map((note) => (
                    <NoteItem key={note._id} note={note} />
                ))}
                {/* we want to show the button if only it is not closed */}
                {ticket.status !== 'closed' && (
                    <button onClick={onTicketClose} className='btn btn-danger btn-block'>Close Ticket</button>
                )}

            </div>
        </motion.div>
    )
}

export default Ticket
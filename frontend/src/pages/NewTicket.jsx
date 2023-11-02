import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'


const NewTicket = () => {
    const { user } = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState("")
    const [description, setDescription] = useState('iPhone')

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/")
            dispatch(reset())
        }
        dispatch(reset())
    }, [message, isSuccess, isError, dispatch, navigate])

    const handleSubmit = (e) => {
        const newTicket = {
            product,
            description
        }

        dispatch(createTicket(newTicket))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below.</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name='product'
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iPad">iPad</option>
                            <option value="iMac">iMac</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description of Issue</label>
                        <textarea
                            placeholder='Description'
                            className='form-control'
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >

                        </textarea>
                    </div>

                    <div className="form-group">
                        <button type='submit' className="btn btn-block">submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket
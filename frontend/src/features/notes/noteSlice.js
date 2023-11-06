import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from "./noteService"


const initialState = {
    notes: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

//Get Notes
export const getNotes = createAsyncThunk("note/getAll", async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.getNotes(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//create a Ticket Note 
export const createNote = createAsyncThunk("note/create", async ({ ticketId, noteText }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return noteService.createNote(ticketId, noteText, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//create Note Slice
export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.notes = action.payload
                state.isSuccess = true
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.notes.push(action.payload)
                state.isSuccess = true
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
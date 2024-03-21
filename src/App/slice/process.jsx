import { createSlice } from '@reduxjs/toolkit'

const processing = createSlice({
    name: 'process',
    initialState: {
        process: ""
    },
    reducers: {
        getProcess: (state, action) => {
            state.process = action.payload
        }
    }
})

export const { getProcess } = processing.actions
export default processing.reducer
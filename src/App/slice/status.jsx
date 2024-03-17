import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../Api'

const status = createSlice({
    name: 'status',
    initialState: {
        status: []
    },
    reducers: {
        getStatus: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { getStatus } = status.actions
export default status.reducer


export const fetchStatusData = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get("/payment/asman-rate", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            dispatch(getStatus(response.data))
        } catch (error) {
            console.log(error);
        }
    };
};
import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../Api'

const notification = createSlice({
    name: 'notifications',
    initialState: {
        notification: []
    },
    reducers: {
        getNotif: (state, action) => {
            state.notification = action.payload
        }
    }
})

export const { getNotif } = notification.actions
export default notification.reducer


export const fetchNotifData = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get("payment/notifications/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            dispatch(getNotif(response.data))
        } catch (error) {
            console.log(error);
        }
    };
};
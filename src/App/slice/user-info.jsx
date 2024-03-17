import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { api } from '../../Api'

const user_info = createSlice({
    name: 'user-info',
    initialState: {
        user_info: []
    },
    reducers: {
        userInfo: (state, action) => {
            state.user_info = action.payload
        }
    }
})

export const { userInfo } = user_info.actions
export default user_info.reducer


export const fetchUserData = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get("/auth/user-info", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            dispatch(userInfo(response.data))
        } catch (error) {
            console.log(error);
        }
    };
};
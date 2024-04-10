import { createSlice } from '@reduxjs/toolkit'
import { api } from '../../Api'

const discount = createSlice({
    name: 'discount',
    initialState: {
        discount: []
    },
    reducers: {
        getdiscount: (state, action) => {
            state.discount = action.payload
        }
    }
})

export const { getdiscount } = discount.actions
export default discount.reducer


export const fetchdiscountData = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get("discount/list/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            dispatch(getdiscount(response.data))
        } catch (error) {
            console.log(error);
        }
    };
};
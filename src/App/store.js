import { configureStore } from '@reduxjs/toolkit'
import user_info from './slice/user-info'
import status from './slice/status'

export const store = configureStore({
    reducer: {
        user_info,
        status
    }
})
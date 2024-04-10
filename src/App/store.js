import { configureStore } from '@reduxjs/toolkit'
import user_info from './slice/user-info'
import status from './slice/status'
import process from './slice/process'
import notification from './slice/notification'
import discount from './slice/discount'

export const store = configureStore({
    reducer: {
        user_info,
        status,
        process,
        notification,
        discount
    }
})
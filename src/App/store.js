import { configureStore } from '@reduxjs/toolkit'
import user_info from './slice/user-info'

export const store = configureStore({
    reducer: {
        user_info
    }
})
import { configureStore } from '@reduxjs/toolkit'
import user_info from './slice/user-info'
import status from './slice/status'
import process from './slice/process'

export const store = configureStore({
    reducer: {
        user_info,
        status,
        process,

    }
})
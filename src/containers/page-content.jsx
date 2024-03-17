import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/home-page/home-page'
import Payments from '../pages/payments/payments'
import Discount from '../pages/discount/discount'
import Market from '../pages/market/market'
import Profile from '../pages/profile/profile'

export default function PageContent() {
    return (
        <div>
            <Routes>
                <Route exact={true} path='/' element={<HomePage />} />
                <Route exact={true} path='/payments' element={<Payments />} />
                <Route exact={true} path='/discount' element={<Discount />} />
                <Route exact={true} path='/market' element={<Market />} />
                <Route exact={true} path='/profile' element={<Profile />} />
            </Routes>
        </div>
    )
}
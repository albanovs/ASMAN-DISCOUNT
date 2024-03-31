import React from 'react'
import './success-payments.css'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import asman from '../../../../views/coins/asmancoin.png'
import { FiChevronLeft } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

export default function SuccessPayments() {

    const process_count = useSelector(state => state.process)

    const navigate = useNavigate()
    return (
        <div className='waiting-contain'>
            <div><FiChevronLeft onClick={() => navigate('/payments')} size={40} /></div>
            <IoCheckmarkDoneCircle size={50} color='#73ff37' />
            <h1>Перевод успешно произведен</h1>
            <p>{process_count.process || 0} <img src={asman} alt="" /></p>
            <NavLink to="/history" className="nav_history">История платежей</NavLink>
        </div>
    )
}
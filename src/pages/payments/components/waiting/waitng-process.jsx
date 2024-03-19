import React from 'react'
import './waiting-process.css'
import { BsClockFill } from "react-icons/bs";
import asman from '../../../../views/coins/asmancoin.png'
import { FiChevronLeft } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';

export default function WaitingProcess() {

    const navigate = useNavigate()
    return (
        <div className='waiting-contain'>
            <div><FiChevronLeft onClick={() => navigate('/')} size={40} /></div>
            <BsClockFill size={50} color='#fdb602' />
            <h1>Платеж в обработке</h1>
            <h2>Проверка реквизитов займет <br /> от 1 минуты до 24 часа</h2>
            <p>1000 <img src={asman} alt="" /></p>
            <NavLink to="/history" className="nav_history">История платежей</NavLink>
        </div>
    )
}

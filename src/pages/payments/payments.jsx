import React from 'react'
import './payments.css'
import { NavLink } from 'react-router-dom'
import { FaHistory } from "react-icons/fa";
import { BsArrowDownUp } from "react-icons/bs";
import { TbShoppingCartDollar } from "react-icons/tb";

export default function Payments() {
    return (
        <div>
            <div className='section-payments'>
                <NavLink className="history" to="/history-payments">
                    <FaHistory />
                    история
                </NavLink>
                <div className='contain-button'>
                    <NavLink to="/qr-details" className='contain-button_item '>
                        <BsArrowDownUp />
                        Перевод
                    </NavLink>
                    <div className='contain-child'>
                        <NavLink className='contain-button_item_child'>Ввод</NavLink>
                        <NavLink className='contain-button_item_child'>Вывод</NavLink>
                    </div>
                    <NavLink to="/buy-asman" className='contain-button_item '>
                        Купить Асман
                        <TbShoppingCartDollar />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
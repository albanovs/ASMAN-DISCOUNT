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
                    <button className='contain-button_item '>
                        <BsArrowDownUp />
                        Перевод
                    </button>
                    <div className='contain-child'>
                        <button className='contain-button_item_child'>Ввод</button>
                        <button className='contain-button_item_child'>Вывод</button>
                    </div>
                    <button className='contain-button_item '>
                        Купить Асман
                        <TbShoppingCartDollar />
                    </button>
                </div>
            </div>
        </div>
    )
}
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
                    <div className='contain-button_item '>
                        <BsArrowDownUp />
                        Перевод
                    </div>
                    <div className='contain-child'>
                        <div className='contain-button_item_child'>Ввод</div>
                        <div className='contain-button_item_child'>Вывод</div>
                    </div>
                    <div className='contain-button_item '>
                        Купить Асман
                        <TbShoppingCartDollar />
                    </div>
                </div>
            </div>
        </div>
    )
}
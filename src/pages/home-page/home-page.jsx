import React from 'react'
import './home-page.css'
import Header from '../../containers/header/header'
import Balance from './components/balance/balance'
import { HiShoppingCart } from "react-icons/hi";

export default function HomePage() {
    return (
        <div className='home-page'>
            <Header />
            <div className='section1'>
                <h1>Ваш статус !</h1>
                <div className='status'>
                    <div>
                        <h1>стандарт</h1>
                        <p>100</p>
                    </div>
                    <div>
                        <h1>бронза</h1>
                        <p>500</p>
                    </div>
                    <div>
                        <h1>серебро</h1>
                        <p>1000</p>
                    </div>
                    <div>
                        <h1>золото</h1>
                        <p>5000</p>
                    </div>
                    <div>
                        <h1>VIP</h1>
                        <p>10 000</p>
                    </div>
                </div>
                <Balance />
                <div className='payment-block'>
                    <div>
                        <div className='contain-button_item_home'>Ввод</div>
                        <div className='contain-button_item_home'>Вывод</div>
                    </div>
                    <div>
                        <div className='contain-button_item_buy'>
                            <h1>Купить</h1>
                            <h2>ASMAN</h2>
                            <HiShoppingCart size={30} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
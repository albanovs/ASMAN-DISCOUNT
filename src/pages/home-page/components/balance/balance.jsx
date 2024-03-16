import React from 'react'
import './balance.css'
import coin from '../../../../views/coins/coin.png'

export default function Balance() {
    return (
        <div className='balance-card'>
            <div>
                <h1>Ваш баланс</h1>
                <h2><img className='coin-img' src={coin} alt="" />5074,192</h2>
                <h1>курс</h1>
                <div className='curs-usdt'>
                    <h3>1 = 0,1 $</h3>
                    <h3> 5074,192 = 507,419 usdt</h3>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

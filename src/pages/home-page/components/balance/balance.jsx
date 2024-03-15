import React from 'react'
import './balance.css'
import coin from '../../../../views/coins/asmancoin.png'

export default function Balance() {
    return (
        <div className='balance-card'>
            <div>
                <h1>Баланс</h1>
                <h2>5000 <span className='coin-asman'>ASMAN</span></h2>
            </div>
            <div>
                <img className='coin-img' src={coin} alt="" />
            </div>
            <div className='curs-usdt'>
                <h1>1 = 0,1 usdt</h1>
                <h2> = 500 <span className='coin-asman'>ustd</span></h2>
            </div>
        </div>
    )
}

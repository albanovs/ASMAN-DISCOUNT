import React from 'react'
import './balance.css'
import coin from '../../../../views/coins/coin.png'

export default function Balance({ balance, curs }) {
    return (
        <div className='balance-card'>
            <div>
                <h1>Ваш баланс</h1>
                <h2><img className='coin-img' src={coin} alt="" />{balance || 0}</h2>
                <h1>курс</h1>
                <div className='curs-usdt'>
                    <h3>{`1 = ${curs} $` || ""}</h3>
                    <h3>{`${balance} = ${(balance * curs).toFixed(2)} usdt`}</h3>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

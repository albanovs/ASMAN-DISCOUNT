import React, { useState } from 'react'
import './balance.css'
import coin from '../../../../views/coins/coin.png'
import { AiFillQuestionCircle } from "react-icons/ai";
import Modal from '../../../../containers/UI/Modal/Modal';

export default function Balance({ balance, curs, info }) {

    const [modal, setModal] = useState(false)

    return (
        <div className='balance-card'>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Ваш баланс</h1>
                    <AiFillQuestionCircle onClick={() => setModal(!modal)} /></div>
                <h2><img className='coin-img' src={coin} alt="" />{balance || 0} <span className='text-balance'>ASMAN</span></h2>
                <h1>курс</h1>
                <div className='curs-usdt'>
                    <h3>{`1 = ${curs} $` || ""}</h3>
                    <h3>{`${balance} = ${(balance * curs).toFixed(2)} usdt`}</h3>
                </div>
            </div>
            <div>
                {
                    modal && <Modal setIsModalOpen={setModal} color="white">
                        <div style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "20px",
                            color: "black"
                        }}>
                            <p dangerouslySetInnerHTML={{ __html: info }} />
                        </div>
                    </Modal>
                }
            </div>
        </div>
    )
}

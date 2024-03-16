import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './qr-details.css'
import coin from '../../../../views/coins/coin.png'
import { IoIosSend } from "react-icons/io";
import { IoQrCode } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";

export default function QrDetails() {

    const [isID, setIsID] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setIsID(id)
        }
    }, [])
    return (
        <div className='contain-details-all'>
            <div>
                <FiChevronLeft onClick={() => navigate(-1)} size={40} />
            </div>
            <div className='contain-details'>
                <h1>Перевод</h1>
                <p>Перевод доступен только между платформами ASMAN DISCOUNT</p>
                <div className='coin-perevod' >
                    <img src={coin} alt="" className='coin-perevod_img' />
                </div>
                <div>
                    <div className='contain-payblock'>
                        <h1 className='balance-perevod'>Введите ID или отсканируйте QR</h1>
                        <div>
                            <h1 className='text-main-perevod'>ID получателя:</h1>
                            <div>
                                <input value={isID} onChange={(e) => setIsID(e.target.value)} type="text" />
                            </div>
                        </div>
                    </div>
                    <div className='contain-payblock'>
                        <h1 className='balance-perevod'>ваш текущий баланс: 5000</h1>
                        <div>
                            <h1 className='text-main-perevod'>Сумма:</h1>
                            <input type="number" />
                        </div>
                        <span className='error-text-perevod'>недостаточно средств</span>
                    </div>
                    <div className='bottom-btn-perevod'>
                        <button onClick={() => navigate('/qr-scanner')}><IoQrCode size={40} /></button>
                        <button className='button-send-perevod'>
                            <IoIosSend />
                            Отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
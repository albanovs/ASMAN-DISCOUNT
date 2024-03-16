import React from 'react'
import './my-qr.css'
import { FiChevronLeft } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import code from './qr-code.png'
import { useNavigate } from 'react-router-dom'

export default function MyQRcode() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className='container-qr'>
            <div><FiChevronLeft onClick={goBack} size={40} /></div>
            <div className='container-qr-block'>
                <h1>Мой QR код</h1>
                <p>Получайте переводы с удобством и безопасностью прямо в приложении</p>
                <div className='qr-block'>
                    <img src={code} alt="" />
                </div>
                <button className='share-button-qr'><CiShare2 />Поделиться</button>
            </div>
        </div>
    )
}

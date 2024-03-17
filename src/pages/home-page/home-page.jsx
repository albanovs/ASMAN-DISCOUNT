import React from 'react'
import './home-page.css'
import Header from '../../containers/header/header'
import Balance from './components/balance/balance'
import { IoQrCodeOutline } from "react-icons/io5";
import { BiScan } from "react-icons/bi";
// import { BsArrowReturnRight } from "react-icons/bs";
// import { BsArrowReturnLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { BsArrowDownLeftCircleFill } from "react-icons/bs";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import LoadingAnimate from '../../UI-kit/loading';

export default function HomePage() {

    const navigate = useNavigate()
    return (
        <div className='home-page'>
            <Header />
            <div className='section1'>
                <h1>Ваш статус !</h1>
                <LoadingAnimate color={'#ccc'} />
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
                <div className='button-payment_home'>
                    <button onClick={() => navigate('/')}><BsArrowDownLeftCircleFill size={40} /><span>Ввод</span></button>
                    <button onClick={() => navigate('/')}><BsArrowDownRightCircleFill size={40} /><span>Вывод</span></button>
                    <button onClick={() => navigate('/qr-details')}><FaPlayCircle size={40} /><span>Перевод</span></button>
                    <button onClick={() => navigate('/')}><FaProductHunt size={40} /><span>Купить</span></button>
                </div>
                {/* <div className='payment-block'>
                    <div className='child-button'>
                        <button className='contain-button_item_home'>Ввод<BsArrowReturnRight /> </button>
                        <button className='contain-button_item_home'>Вывод<BsArrowReturnLeft /></button>
                    </div>
                    <button className='contain-button_item_buy'>
                        <div>
                            <h1>Купить</h1>
                            <h2>ASMAN</h2>
                        </div>
                        <HiShoppingCart size={30} />
                    </button>
                </div> */}
                <div>
                </div>
                <div className='child-button_qr'>
                    <button className='contain-button_item_qr' onClick={() => navigate('/my-qr')}>Мой QR <IoQrCodeOutline size={40} /></button>
                    <button className='contain-button_item_qr' onClick={() => navigate('/qr-scanner')}>Сканнер <BiScan size={40} /></button>
                </div>
            </div>
        </div >
    )
}
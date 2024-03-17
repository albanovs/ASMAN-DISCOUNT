import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './buy-asman.css';
import coin from '../../views/coins/coin.png';
import { IoIosSend } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";
import { api } from '../../Api';

export default function BuyAsman() {
    const [scrin, setscrin] = useState(null);
    const navigate = useNavigate();

    const sendImage = (event) => {
        const imageFile = event.target.files && event.target.files[0];
        setscrin(imageFile);
    };

    const buyAsmanSend = async () => {
        try {
            const token = localStorage.getItem('token');
            const formatData = new FormData();
            formatData.append('img', scrin);

            await api.post('/payment/buy-asman/', formatData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='contain-buyasman-all'>
            <div>
                <FiChevronLeft onClick={() => navigate('/')} size={40} />
            </div>
            <div className='contain-buyasman'>
                <h1>Купить ASMAN</h1>
                <p>Перевод доступен только между платформами ASMAN DISCOUNT</p>
                <div className='coin-buyasman' >
                    <img src={coin} alt="" className='coin-buyasman_img' />
                </div>
                <div>
                    <div className='buyasman-payblock'>
                        <h1 className='balance-perevod'>Адресс кошелька:</h1>
                    </div>
                    <div className='buyasman-payblock'>
                        <h1 className='balance-buyasman'>Прикрепите скриншот вашей транзакции</h1>
                        <div>
                            <input
                                className="input_form"
                                type="file"
                                accept="image/*"
                                onChange={sendImage}
                            />
                        </div>
                    </div>
                    <div className='bottom-btn-buyasman'>
                        <button onClick={buyAsmanSend} className='button-send-perevod'>
                            <IoIosSend />
                            Купить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
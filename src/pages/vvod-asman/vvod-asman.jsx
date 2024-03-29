import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './vvod-asman.css';
import coin from '../../views/coins/coin.png';
import { IoIosSend } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";
import { api } from '../../Api';
import { useDispatch, useSelector } from 'react-redux'
import { getProcess } from '../../App/slice/process'
import LoadingAnimate from '../../UI-kit/loading';
import { fetchStatusData } from '../../App/slice/status';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TbClipboardCopy } from 'react-icons/tb';

export default function VvodAsman() {
    const [scrin, setscrin] = useState(null);
    const [loading, setLoading] = useState(false)
    const [load_scrin, setLoadScrin] = useState(false)
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStatusData())
    }, [dispatch])

    const getStatus = useSelector(state => state.status.status)

    const sendImage = (event) => {
        const imageFile = event.target.files && event.target.files[0];
        setscrin(imageFile);
    };

    const buyAsmanSend = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token');
            const formatData = new FormData();
            formatData.append('img', scrin);

            const response = await api.post('/payment/buy-asman/', formatData, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (response.data.response) {
                dispatch(getProcess('Ожидание'))
                navigate('/waiting')
                setLoading(false)
            } else {
                setLoading(false)
                setLoadScrin(true)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className='contain-buyasman-all'>
            <div>
                <FiChevronLeft onClick={() => navigate('/')} size={40} />
            </div>
            <div className='contain-buyasman'>
                <h1>Ввод ASMAN</h1>
                <p>Ввод ASMAN через валюту ASMAN</p>
                <div className='coin-buyasman' >
                    <img src={coin} alt="" className='coin-buyasman_img' />
                </div>
                <div>
                    <div className='buyasman-payblock'>
                        {copied && <p style={{
                            color: 'green',
                            textAlign: 'center',
                            position: 'absolute',
                            top: '5px',
                            left: '150px',
                            fontSize: '12px'
                        }}>Скопирован</p>}
                        <h1 className='balance-perevod'>Адресс кошелька ASMAN:</h1>
                        <h2 className='payment-usdt-block'>{getStatus.asman}</h2>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px'
                        }}>
                            <CopyToClipboard text={getStatus.usdt} onCopy={handleCopy}>
                                <TbClipboardCopy className='' size={30} />
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className='buyasman-payblock'>
                        <h1 className='balance-buyasman'>Прикрепите скриншот вашей транзакции</h1>
                        {load_scrin ? <span className='error-text-buyasman'>скриншот не приклеплен</span> : ""}
                        <div>
                            <input
                                className="input_form_buyasman"
                                type="file"
                                accept="image/*"
                                onChange={sendImage}
                            />
                        </div>
                    </div>
                    <div className='bottom-btn-buyasman'>
                        <button style={{ background: loading ? '#bba97a' : "#fdb602" }} disabled={loading} onClick={buyAsmanSend} className='button-send-perevod'>
                            {loading ? <LoadingAnimate /> : <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <IoIosSend /> Купить</div>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
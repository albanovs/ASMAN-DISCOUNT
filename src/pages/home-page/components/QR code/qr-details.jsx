import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './qr-details.css'
import coin from '../../../../views/coins/coin.png'
import { IoIosSend } from "react-icons/io";
import { IoQrCode } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { api } from '../../../../Api';
import LoadingAnimate from '../../../../UI-kit/loading';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData } from '../../../../App/slice/user-info'
import { getProcess } from '../../../../App/slice/process'

export default function QrDetails() {

    const [isID, setIsID] = useState("")
    const user_coin = useSelector(state => state.user_info.user_info)
    const dispatch = useDispatch()
    const [coin_count, setCoinCount] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const [isBalance, setIsBalance] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setIsID(id)
        }
    }, [])

    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])

    useEffect(() => {
        parseFloat(coin_count) > (user_coin.balance || 0)
            ? setIsBalance(true) : setIsBalance(false)
    }, [coin_count])

    const transition = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await api.post('/payment/scanner/?type=1', {
                recipient: isID,
                amount: parseFloat(coin_count),
            }, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            if (!response.data.response) {
                setIsUser(true)
                setLoading(false)
                return
            } else {
                setLoading(false)
                setCoinCount("")
                setIsID("")
                navigate('/success-payments')
                dispatch(getProcess(coin_count))
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='contain-details-all'>
            <div>
                <FiChevronLeft onClick={() => navigate('/')} size={40} />
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
                            {isUser ? <span className='error-text-user'>неправильный ID пользователя</span> : ""}
                            <div>
                                <input value={isID} onChange={(e) => setIsID(e.target.value)} type="text" />
                            </div>
                        </div>
                    </div>
                    <div className='contain-payblock'>
                        <h1 className='balance-perevod'>ваш текущий баланс: {user_coin.balance || 0}</h1>
                        <div>
                            <h1 className='text-main-perevod'>Сумма:</h1>
                            <input type="number" value={coin_count} onChange={(e) => setCoinCount(e.target.value)} />
                        </div>
                        {isBalance ? <span className='error-text-perevod'>недостаточно средств</span> : ""}
                    </div>
                    <div className='bottom-btn-perevod'>
                        <button onClick={() => navigate('/qr-scanner')}><IoQrCode size={40} /></button>
                        <button style={{ background: loading ? '#bba97a' : "#fdb602" }} disabled={loading} onClick={() => transition()} className='button-send-perevod'>
                            {loading ? <LoadingAnimate /> : <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}> <IoIosSend /> Отправить</div>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
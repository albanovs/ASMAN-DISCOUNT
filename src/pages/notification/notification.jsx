import React from 'react'
import './notification.css'
import { api } from '../../Api'
import { useState, useEffect } from 'react'
import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function NotificationPage() {

    const [notification, setNotification] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getNotif = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get('payment/notifications/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                setNotification(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        getNotif()
    }, [])

    return (
        <div className='notifictaion_container'>
            <div>
                <FiChevronLeft color='#fdb602' onClick={() => navigate('/')} size={40} />
                <span>Уведомление</span>
            </div>
            <div>
                {
                    notification.map((el, index) => {
                        return (
                            <div key={index} style={el.type === 1 ? { alignItems: "end" } : { alignItems: "start" }} className='item_notification'>
                                <div style={el.type === 1 ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
                                    <img src={el.img} alt="" />
                                    <div>
                                        <h1>{el.type === 1 ? "Перевод" : "Пополнение"}: <span>{el.amount}</span></h1>
                                        <p>{el.type === 1 ? "для" : "от"} <span>{el.info}</span></p>
                                        <h2>Доступно: <span>{el.balance} asman</span></h2>
                                        <h2 className='notif_time'>Время: {el.operation_time}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}
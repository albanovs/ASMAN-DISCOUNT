import React, { useEffect, useRef } from 'react'
import './notification.css'
import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifData } from '../../App/slice/notification'

export default function NotificationPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification.notification)
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, [notification]);

    useEffect(() => {
        dispatch(fetchNotifData())
    }, [dispatch])

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
                <div ref={endRef}></div>
            </div>
        </div >
    )
}
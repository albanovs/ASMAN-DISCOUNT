import React, { useEffect, useState } from 'react'
import './payments.css'
import { api } from '../../Api'
import { MdOutlineHistory } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { MdOutlineNavigateNext } from "react-icons/md";
import Modal from '../../containers/UI/Modal/Modal';
export default function Payments() {

    const [history, setHistory] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const fetchDataHistory = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get('/payment/history/', {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                setHistory(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchDataHistory()
    }, [])

    return (
        <div>
            <div className='section-payments'>
                <div className='button_period' onClick={() => setModal(!modal)}>Выбрать период <MdOutlineNavigateNext /> </div>
                {modal && (
                    <Modal setIsModalOpen={setModal}>

                    </Modal>
                )}
                {
                    history.map((data, index) => {

                        return (
                            <div key={index} className='section-payments_items'>
                                <h1>{data.date}</h1>
                                {
                                    data.list.map((data, index) => {
                                        return (
                                            <div key={index}>
                                                <h1>{data.info}</h1>
                                                <p
                                                    className='detail_count_status'
                                                    style={data.status === 0 ?
                                                        { color: 'red' }
                                                        : data.status === 1
                                                            ? { color: '#00FF7F' }
                                                            : { color: 'var(--orange)' }}
                                                > {data.info === "Покупка Asman" && data.status === 2 ?
                                                    <span style={{ fontSize: "12px" }}>В обработке</span>
                                                    : data.info === "Покупка Asman" && data.status === 0 ? <span style={{ fontSize: "12px" }}>Отклонено</span> : data.type === 1 ? `+${data.total}` : `-${data.total}`}
                                                    <span>{data.status === 0 ? <MdCancel /> : data.status === 1 ? <IoCheckmarkDoneCircleSharp /> : <MdOutlineHistory />}</span></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}
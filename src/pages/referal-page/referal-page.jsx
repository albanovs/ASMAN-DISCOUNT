import React, { useEffect, useState } from 'react'
import './referal-page.css'
import CopyToClipboard from 'react-copy-to-clipboard'
import { TbClipboardCopy } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../../App/slice/user-info'
import { api } from '../../Api'

export default function ReferalPage() {

    const userData = useSelector(state => state.user_info.user_info)
    const [copied, setCopied] = useState(false);
    const [referalData, setReferalData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserData())
        fetchReferalData()
    }, [dispatch])

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const fetchReferalData = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('auth/ref-list/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setReferalData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleShareLink = async () => {
        try {
            await navigator.share({
                title: 'Приглашение в платформу ASMAN DISCOUNT',
                text: `Вас пригласил ${userData.first_name} в платформу ASMAN DISCOUNT. Перейдите по ссылке и зарегистрируйтесь:`,
                url: `https://orozmat.mirzabekov.fvds.ru/api/auth/register/${userData.id}`
            });
        } catch (error) {
            console.error('Ошибка обмена:', error.message);
        }
    };

    return (
        <div className='referal_container'>
            <div>
                <h1>ваша персональная ссылка</h1>
                <p>{`https://orozmat.mirzabekov.fvds.ru/#/register/${userData.id}`}</p>
                <CopyToClipboard text={`https://orozmat.mirzabekov.fvds.ru/#/register/${userData.id}`} onCopy={handleCopy}>
                    <TbClipboardCopy className='button-referal-home_page' size={30} />
                </CopyToClipboard>
                {copied && <p className='copyed-referal'>Скопирован</p>}
            </div>
            <button onClick={handleShareLink}>Пригласить</button>
            <div className='referal_list'>
                <h1>Список ваших приглашенных друзьей</h1>
                <div className='referal_list_contain'>
                    {
                        referalData.map(elem => {
                            return (
                                <div>
                                    <div>
                                        <div className='item_referal_user'>
                                            <h1>{`${elem.first_name} ${elem.last_name}`}</h1>
                                            <p>{elem.email}</p>
                                        </div>
                                        {
                                            elem.bonuses.length > 0 ? (
                                                <div>
                                                    <h2>Поступленные бонусы:</h2>
                                                    <div className='contain_referal_bonus'>
                                                        {
                                                            elem.bonuses.map(item => {
                                                                const datas = new Date(item.operation_time)
                                                                const day = ("0" + datas.getDate()).slice(-2);
                                                                const month = ("0" + (datas.getMonth() + 1)).slice(-2);
                                                                const year = datas.getFullYear().toString().slice(-2);

                                                                const formatDate = `${day}.${month}.${year}`;
                                                                return (
                                                                    < div style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between',
                                                                    }}>
                                                                        <h1> <span> + {item.amount} asman</span></h1>
                                                                        <p>дата: {formatDate}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            ) : ""
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}
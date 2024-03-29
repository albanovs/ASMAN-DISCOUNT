import React, { useEffect, useState } from 'react';
import './my-qr.css';
import { FiChevronLeft } from 'react-icons/fi';
import { CiShare2 } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../App/slice/user-info';

export default function MyQRcode() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_qr = useSelector((state) => state.user_info.user_info);
    const [qrImage, setQrImage] = useState('');
    
    useEffect(() => {
        dispatch(fetchUserData());
        fetchQrImage();
    }, [dispatch]);

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Поделиться моим QR-кодом',
                text: 'Сканируйте мой QR-код в приложении ASMAN DISCOUNT',
                files: [qrImage],
            });
            console.log('QR-код успешно поделен');
        } catch (error) {
            console.error('Ошибка обмена:', error.message);
        }
    };

    const fetchQrImage = () => {
        try {
            const response = user_qr.qr;
            const imageUrl = URL.createObjectURL(response);
            setQrImage(imageUrl);
        } catch (error) {
            console.error('Ошибка загрузки QR-кода:', error.message);
        }
    };

    const handleFallbackShare = () => {
        // Логика обмена для браузеров, не поддерживающих API обмена
        console.log('Вызван альтернативный метод обмена QR-кодом');
    };

    return (
        <div className="container-qr">
            <div>
                <FiChevronLeft onClick={() => navigate(-1)} size={40} />
            </div>
            <div className="container-qr-block">
                <h1>Мой QR код</h1>
                <p>Получайте переводы с удобством и безопасностью прямо в приложении</p>
                <div className="qr-block">
                    <img src={user_qr.qr} alt="" />
                    <h1>{user_qr.id}</h1>
                </div>
                {navigator.share ? (
                    <button className="share-button-qr" onClick={handleShare}>
                        <CiShare2 /> Поделиться
                    </button>
                ) : (
                    <button className="share-button-qr" onClick={handleFallbackShare}>
                        <CiShare2 /> Поделиться
                    </button>
                )}
            </div>
        </div>
    );
}
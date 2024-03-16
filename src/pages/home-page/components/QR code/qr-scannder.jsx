import React, { useRef, useEffect } from 'react';
import Quagga from 'quagga';

const QRScanner = () => {
    const videoRef = useRef(null); // Создаем ссылку на элемент video

    useEffect(() => {
        // Инициализация Quagga
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: videoRef.current, // Используем текущий элемент video в качестве цели для потока видео
            },
            decoder: {
                readers: ["code_128_reader"] // Здесь можно указать типы считываемых кодов
            }
        }, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            // Запуск сканирования
            Quagga.start();
        });

        // Остановка сканирования при размонтировании компонента
        return () => {
            Quagga.stop();
        };
    }, []);

    return (
        <div>
            {/* Видеоэлемент, который будет использоваться для сканирования */}
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }} /> {/* Устанавливаем стили для элемента video */}
        </div>
    );
};

export default QRScanner;

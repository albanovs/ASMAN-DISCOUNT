import React, { useRef, useEffect } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

const QRScanner = () => {
    const videoRef = useRef(null);
    let codeReader;

    useEffect(() => {
        // Создаем новый экземпляр сканера
        codeReader = new BrowserBarcodeReader();
        // Начинаем сканирование
        startScanning();

        // Останавливаем сканирование при размонтировании компонента
        return () => {
            stopScanning();
        };
    }, []);

    const startScanning = () => {
        // Остановка предыдущего сканирования, если оно было
        stopScanning();
        // Начинаем сканирование с использованием видео из рефа
        codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
            if (result) {
                console.log(result.getText());
                // Делайте что-то с распознанным текстом QR-кода
            }
        });
    };

    const stopScanning = () => {
        if (codeReader) {
            // Остановка предыдущего сканирования, если оно было
            codeReader.reset();
        }
    };

    return (
        <div>
            {/* Видеоэлемент, который будет использоваться для сканирования */}
            <video ref={videoRef} />
        </div>
    );
};

export default QRScanner;
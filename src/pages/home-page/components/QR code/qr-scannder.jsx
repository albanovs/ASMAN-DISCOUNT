import React, { useRef, useEffect } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
    const videoRef = useRef(null);
    let codeReader;
    const navigate = useNavigate();

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoRef.current.srcObject = stream;
                codeReader = new BrowserBarcodeReader();
                startScanning();
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        startCamera();

        return () => {
            stopScanning();
        };
    }, []);

    const startScanning = () => {
        stopScanning();
        codeReader.decodeFromVideoElement(videoRef.current, (result, err) => {
            if (result) {
                console.log(result.getText());
                // Переходим на новый маршрут после успешного распознавания QR-кода
                navigate(`/details-qr/${result.getText()}`);
            } else if (err) {
                console.error('Error decoding QR code:', err);
            }
        });
    };

    const stopScanning = () => {
        if (codeReader) {
            codeReader.reset();
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline muted />
        </div>
    );
};

export default QRScanner;

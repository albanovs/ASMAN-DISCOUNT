import React, { useRef, useEffect } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

const QRScanner = () => {
    const videoRef = useRef(null);
    let codeReader;

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
                // Делайте что-то с распознанным текстом QR-кода
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

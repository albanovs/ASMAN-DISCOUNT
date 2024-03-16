import React from 'react';
import QRScanner from './QR code/qr-scannder';

const ScanPage = () => {
    return (
        <div>
            <h1>Сканирование QR-кодов</h1>
            <QRScanner />
        </div>
    );
};

export default ScanPage;

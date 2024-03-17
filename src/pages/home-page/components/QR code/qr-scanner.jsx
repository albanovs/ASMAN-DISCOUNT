import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import './qr-scanner.css'

const QRScanner = () => {
    const navigate = useNavigate();

    const { ref, stop } = useZxing({
        constraints: {
            video: {
                facingMode: "environment"
            }
        },
        onDecodeResult(result) {
            const text = result.getText();
            navigate(`/details-qr/${text}`);
            stop();
        },
    });

    return (
        <div className="scanner-container">
            <div className="video-container">
                <video ref={ref} className="scan-video" controls={false} />
            </div>
        </div>
    );
};

export default QRScanner;

// import { Scanner } from '@yudiel/react-qr-scanner';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './qr-scanner.css'

// const QRScanner = () => {

//     const [scanResult, setScanResult] = useState(null)
//     const [scanning, setScanning] = useState(true);
//     const navigate = useNavigate()

//     const result_success = (text) => {
//         setScanResult(text)
//         setScanning(false);
//         navigate(`/details-qr/${text}`)
//     }

//     return (
//         <div>
//             {scanning && (
//                 <div className='contain-scan_cam'>
//                     <h1>Наведите камеру на QR</h1>
//                     <Scanner
//                         facingMode="environment"
//                         facingModeExact
//                         askPermission
//                         onResult={result_success}
//                         onError={error => console.log(error?.message)}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default QRScanner
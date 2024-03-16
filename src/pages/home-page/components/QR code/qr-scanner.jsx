import { useState } from "react";
import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import './qr-scanner.css'

const QRScanner = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState("");

    const { ref, stop } = useZxing({
        constraints: {
            video: {
                facingMode: "environment"
            }
        },
        onDecodeResult(result) {
            const text = result.getText();
            setResult(text);
            navigate(`/details-qr/${text}`);
            stop();
        },
    });

    return (
        <div className="scanner-container">
            <div className="video-container">
                <video ref={ref} className="scan-video" controls={false} />
                <div className="overlay"></div> {/* Прозрачная рамка */}
            </div>
        </div>
    );
};

export default QRScanner;

// import { Scanner } from '@yudiel/react-qr-scanner';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const QRScanner = () => {

//     const [scanResult, setScanResult] = useState(null)
//     const [scanning, setScanning] = useState(true);
//     const navigate = useNavigate()
//     console.log(scanResult);

//     const result_success = (text) => {
//         setScanResult(text)
//         setScanning(false);
//         navigate(`/details-qr/${text}`)
//     }

//     const scannerStyle = {
//         width: '100%',
//         height: '100vh',
//         border: '2px solid #ccc',
//         borderRadius: '8px',
//     };

//     return (
//         <div>
//             {scanning && (
//                 <Scanner
//                     style={scannerStyle}
//                     facingMode="environment"
//                     facingModeExact
//                     askPermission
//                     onResult={result_success}
//                     onError={error => console.log(error?.message)}
//                 />
//             )}
//         </div>
//     );
// }

// export default QRScanner
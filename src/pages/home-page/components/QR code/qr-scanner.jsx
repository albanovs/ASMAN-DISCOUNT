import { useState } from "react";
import { useZxing } from "react-zxing";
import { useNavigate } from "react-router-dom";
import './qr-scanner.css'

const QRScanner = () => {

    const navigate = useNavigate()
    const [result, setResult] = useState("");
    const { ref, stop } = useZxing({
        constraints: {
            video: {
                facingMode: "environment"
            }
        },
        onDecodeResult(result) {
            setResult(result.getText());
            navigate(`/details-qr/${result}`)
            stop();
        },
    });

    return (
        <div className="scanner-container">
            <div>
                <video ref={ref} className="scan-video" />
            </div>
        </div>
    );
};

export default QRScanner;

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
            <div>
                <video ref={ref} className="scan-video" />
            </div>
        </div>
    );
};

export default QRScanner;
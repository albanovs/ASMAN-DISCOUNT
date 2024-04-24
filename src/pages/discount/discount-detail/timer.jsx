import React, { useState, useEffect } from 'react';

export function CountdownTimer({ minute }) {
    const [timeLeft, setTimeLeft] = useState(minute * 60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft === 0) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [minute]);

    const formatTime = (time) => {
        const days = Math.floor(time / 86400);
        const hours = Math.floor((time % 86400) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${days > 0 ? days + ' день ' : ''}${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            Приходите через: {formatTime(timeLeft)}
        </div>
    );
}
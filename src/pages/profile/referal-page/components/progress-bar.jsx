import React from 'react';

const CircularProgress = ({ radius, strokeWidth, progress }) => {
    const normalizedRadius = radius - strokeWidth * 5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#fdb602" />
                </filter>
            </defs>
            <circle
                stroke="#fdb602"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                filter="url(#shadow)"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to={strokeDashoffset}
                    dur="0.85s"
                    fill="freeze"
                />
            </circle>
        </svg>
    );
};

export default CircularProgress;
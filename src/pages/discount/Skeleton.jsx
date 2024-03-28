import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonDiscount({ width = 170, height = 120, marginTop = 20 }) {
    return (
        <div style={{ marginTop: `${marginTop}px` }}>
            <Skeleton width={90} height={15} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {[...Array(8)].map((_, index) => (
                    <div key={index}>
                        <Skeleton width={width} height={height} />
                        <Skeleton width={80} height={10} />
                    </div>
                ))}
            </div>
        </div>
    );
}
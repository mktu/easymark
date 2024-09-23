import React, { FC } from 'react';

type Props = {
    size?: number;
    className?: string;
}

const LoadingIcon: FC<Props> = ({ size = 50, className }) => (
    <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'rotate 2s linear infinite' }}>
        <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            strokeDasharray="31.4 31.4"
            strokeLinecap="round"
            style={{ animation: 'dash 1.5s ease-in-out infinite' }}
        />
        <style>
            {`
        @keyframes rotate {
          100% { transform: rotate(360deg); }
        }
        @keyframes dash {
          0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
        }
      `}
        </style>
    </svg>
);

export default LoadingIcon;

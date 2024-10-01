'use client'
import { CircleAlertIcon } from 'lucide-react';
import React from 'react';

const ErrorIndicator: React.FC<{ error?: string | string[] }> = ({ error }) => {
    if (!error) return null;
    const msg = Array.isArray(error) ? error.join(', ') : error;
    return (
        <p className='flex items-center gap-2 text-destructive' role='alert'>
            <CircleAlertIcon className='size-4' />
            {msg}
        </p>
    );
};

export default ErrorIndicator;
'use client'
import { cn } from '@/lib/utils';
import { CircleAlertIcon } from 'lucide-react';
import React from 'react';

const ErrorIndicator: React.FC<{ error?: string | string[], className?: string }> = ({ error, className }) => {
    if (!error) return null;
    const msg = Array.isArray(error) ? error.join(', ') : error;
    return (
        <p className={cn('flex items-center gap-2 text-destructive', className)} role='alert'>
            <CircleAlertIcon className='size-4' />
            {msg}
        </p>
    );
};

export default ErrorIndicator;
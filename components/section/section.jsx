import { cn } from '@/lib/utils';
import React from 'react';


export function Section({ className,children }) {
    return (
        <div className={cn('flex h-screen bg-red-500', className)}>
        <p> section</p>   
            <p>{children}</p>
        </div>
    );
}


import { cn } from '@/lib/utils';
import React from 'react';


export function Section({ className }) {
    return (
        <div className={cn('flex h-screen bg-red-500', className)}>
            section
        </div>
    );
}


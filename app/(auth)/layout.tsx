import BotSpline from '@/components/BotSpline';
import React from 'react'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='relative justify-center sm:justify-start h-[92dvh] w-dvw flex p-8 items-center overflow-hidden'>
        <div className='hidden scale-150 sm:block absolute inset-0 z-0'>
            <BotSpline />
        </div>
            {children}
    </div>
    
    )
}
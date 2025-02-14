import Provider from '@/components/Providers/Provider';
import React from 'react'

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider>
        {children}
        </Provider>
    )
}
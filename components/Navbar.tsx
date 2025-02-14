'use client'

import { ArrowLeft, Shield } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-blue-600" />
                        <span className="text-2xl font-bold text-gray-900">TrustGuard</span>
                    </div>
                    <div>
                        {pathname !== "/" &&
                            <button
                                onClick={() => router.push('/')}
                                className="flex text-sm items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Back to Home</span>
                            </button>
                        }
                        
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
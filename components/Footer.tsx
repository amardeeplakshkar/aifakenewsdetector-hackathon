import { Shield } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-white">
     <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <div className="flex justify-center items-center space-x-2">
         <Shield className="h-6 w-6 text-blue-600" />
         <span className="text-gray-400">© 2025 TrustGuard. All rights reserved.</span>
       </div>
     </div>
   </footer>
  )
}

export default Footer
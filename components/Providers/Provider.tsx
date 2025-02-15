import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { ThemeProvider } from './ThemeProvider'
import { YtUrlProvider } from '../context/YtUrlContext'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    >
      <YtUrlProvider>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar/>
        {children}
        <Footer/>
    </div>
      </YtUrlProvider>
    </ThemeProvider>
  )
}

export default Provider
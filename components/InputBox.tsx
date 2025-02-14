import React from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FaLink, FaPaperPlane } from 'react-icons/fa'
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from './ui/drawer'
import { Send, Youtube } from 'lucide-react'

const InputBox = () => {
    return (
        <div className='border rounded-xl p-4 '>
            <Textarea
                className='resize-none border-0 focus-visible:ring-0 focus-visible:ring-transparent text-lg'
                placeholder="Paste News Article Here..." />
            <div className='flex justify-between items-center gap-2'>
                <Drawer>
                    <DrawerTrigger>
                        <Button>
                            <FaLink />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className=''>
                        <div className='h-[25dvh] p-4 gap-4 flex justify-center items-center flex-col'>
                            <Youtube />
                            <Input />
                            <div className='flex justify-between items-center w-full'>
                                <div></div>
                                <DrawerClose>
                                    <Button className='self-end'>
                                        <Send className='cursor-pointer' />
                                    </Button>
                                </DrawerClose>
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
                <Button>
                    <FaPaperPlane />
                </Button>
            </div>
        </div>
    )
}

export default InputBox
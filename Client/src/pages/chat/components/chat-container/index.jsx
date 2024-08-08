import React from 'react'
import ChatHeader from './components/chat-header'
import MessageBar from './components/message-bar'
import MessageContainer from './components/message-container'
import { useAppStore } from '@/store/store'
import ChatDetails from '../ChatDetails/ChatDetails'

const ChatContainer = () => {
  const { isChatDetails } = useAppStore();
  return (
    <div className='fixed top-0 h-[100vh] w-[100vw] bg-[#1c1d25] flex flex-col md:static md:flex-1'>
      {
        !isChatDetails ? (
          <>
            <ChatHeader/>
            <MessageContainer/>
            <MessageBar/> 
          </>
        ):(
          <ChatDetails/>
        )
      }
      
    </div>
  )
}

export default ChatContainer

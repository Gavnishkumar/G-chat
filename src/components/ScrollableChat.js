import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSenderMargin,isSameUser} from '../config/ChatLogics'
import { ChatState } from '../context/createContext'
import { Avatar, Box, Text, Tooltip, position } from '@chakra-ui/react'
import {useEffect} from 'react'
const ScrollableChat = ({messages,isTyping}) => {
    const {user,selectedChat}= ChatState();
useEffect(()=>{

},[selectedChat])
  return (
    <ScrollableFeed >
        {messages && messages.map((m,i)=>(

            <div style={{fontSize:"18px",display: "flex"}} key={m._id}>
                
               <div  style={{
                
                backgroundColor: `${
                  // m.sender._id === user.data._id ? "#BEE3F8" : "#B9F5D0"
                  m.sender._id === user.data._id ? "#DAC9B8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.data._id),
                padding: "4px 9px",
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                maxWidth: "80%",
                borderRadius: "8px",
            }
                
                }>{selectedChat.isGroupChat && m.sender._id!== user.data._id && <Text fontSize="xs" fontWeight='bold' textDecoration="underline"><i >{m.sender.name}</i></Text>}{m.content}</div>
            </div>
        ))}
        {isTyping && <span marginLeft={33}>Typing...</span>}
    </ScrollableFeed>
  )
}

export default ScrollableChat

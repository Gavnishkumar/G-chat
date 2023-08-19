import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { ChatState } from '../context/createContext'
import SingleChat from './SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {selectedChat}=ChatState();
 
  return (
    <Box
    display={{base: selectedChat ? "flex" : "none", md: "flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="#25D366"
    w={{base: "100%", md: "68%"}}
    borderRadius="lg"
    borderWidth="1px"
    
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox

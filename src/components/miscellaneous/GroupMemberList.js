import { Avatar, Box, Button, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../context/createContext'
import axios from 'axios'

const GroupMemberList = ({member}) => {
  const {user,selectedChat}=ChatState();
  const toast= useToast();
  const handleLeave=async()=>{
    try {
      const config={
        headers:{
          Authorization: `Bearer ${user.data.token}`
        }
      }
      await axios.put('api/chats/groupremove',{"chatId":selectedChat._id,"userId": member._id},config);
      toast({
        title: 'Successfull',
        status: "success",
        description: "Leaved from group",
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Failed',
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
      })
    }
  }
  return (
    
      <Box fontSize="xl" display="flex" flexDir="row"  alignItems="center" w="100%" p={1} borderRadius={3} bg="#C0C0C0" my={4}>
        <Avatar name={member.name} m={2} Size="20px" src={member.pic}></Avatar>
        <Box px={1}>
        <Text fontFamily="heading" fontSize="20px" fontWeight="semibold">{member.name}</Text>
        <Text fontFamily="serif" fontSize="xs">{member.email}</Text>
        </Box>
        { (user.data._id===selectedChat.groupAdmin._id || member._id===user.data._id) ?
        <Button color="red" onClick={handleLeave}>Leave</Button> :<></>
      }
        </Box>
    
  )
}

export default GroupMemberList

import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/createContext';
import { Box, Button, useToast,Stack,Text, Avatar} from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender, getSenderPic } from '../config/ChatLogics';
import '../App.css';
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({fetchAgain}) => {
  const {user,selectedChat,setSelectedChat,chats,setChats}=ChatState();

  const [loggedUser,setLoggedUser]=useState([]);
  const toast=useToast();
  const fetchChats=async()=>{
    try {
      const config={
        headers:{
          Authorization: `Bearer ${user.data.token}`
        }
      }
      const {data} = await axios.get('/api/chats/',config);
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error',
        status: "error",
        description: "failed to load chats",
        duration: 5000,
        isClosable: true,
      })
    }
  }
useEffect(()=>{
  setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
  
  fetchChats();
},[fetchAgain])
useEffect(()=>{
  
},[selectedChat])
  return (
    <Box 
    display={{base: selectedChat ? "none" : "flex" ,md:"flex"}}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{base: "100%" ,md: "31%"}}
            borderRadius="lg"
            borderWidth="1px">
            <Box pb={3}
            px={3}
            fontSize={{base: "28px",md: "30px"}}
            fontFamily="Work sans"
            d="flex"
            w="100%"
            justifyContent="space-between"
           > 
                MY chats
                <GroupChatModal>
                <Button d="flex" fontSize={{base: "17px",md:"10px",lg: "17px"}}
                rightIcon={<AddIcon/>}>
                  Create Group
                </Button>
                </GroupChatModal>
            </Box>
            <Box d="flex"
            flexDir="column"
            p={3}
            w="100%"
            bg="#F8F8F8"
            h="100%"
            borderRadius="lg"
            overflow="hidden"
            overflowY="scroll"
             className="all-chats"
          >
                {
                  chats ? ( 
                    <Stack overflowY="scroll">
                      {chats.length!==0 && chats.map((chat)=>{ return (
                        <Box
                        onClick={()=>{setSelectedChat(chat)
                        }
                      }
                        cursor="pointer"
                        bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                        color={selectedChat===chat ? "white" : "black"}
                        px={3}
                        py={2}
                        borderRadius="lg"
                        key={chat._id}>
                          <Text fontSize="2xl" fontFamily="revert" >
                            
                            {(!chat.isGroupChat ) ? (<span> <Avatar name={getSender(loggedUser,chat.users)}
                            src={getSenderPic(loggedUser,chat.users)}
                            /> {getSender(loggedUser,chat.users)}</span>):(
                              <span><Avatar name={chat.chatName} /> {chat.chatName} </span>
                            )}
                          </Text>
                        </Box>)
                      }
                      )}
                    </Stack>
                  ): (
                    <ChatLoading/>
                  )
                }
            </Box>
    </Box>
  )
}
export default MyChats

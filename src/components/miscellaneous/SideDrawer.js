import { BellIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Tooltip,Text, MenuButton, Menu, MenuList, Avatar, MenuItem, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Input, useToast, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/createContext';
import ProfileModal from './ProfileModal';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserList from '../UserList';
import { getSender } from "../../config/ChatLogics";
import { Badge } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const navigate= useNavigate()
  const {user,selectedChat,setSelectedChat,chats,setChats,notification,setNotification}=ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure()
 
  const [search,setSearch]= useState();
  const [searchResult,setSearchResult]= useState([]);
  const [loading,setLoading]= useState(false);
  const [loadingChat,setLoadingChat]= useState(false);
  const toast= useToast();
 
  const handleSearch=async()=>{
    
    if(!search){
      toast({
        title: 'Please enter the name to search',
        status: "error",
        duration: 5000,
        position: 'top-left',
        isClosable: true,
      })
      setSearchResult([])
      return;
    }
    else{
      setLoading(true)
    const config={
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    }
  
    try {
      const data= await axios.get(`/api/user?search=${search}`,config);
      
        setSearchResult(data.data);
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }
  }

  // accessing chat of user
  const accessChat= async (userId)=>{
   setLoadingChat(true);
    try {
      const config={
        headers:{
          'Content-type' : 'application/json',
          Authorization: `Bearer ${user.data.token}`,
        },
  
      }
      const userIdobj={"userId": userId};
      const {data} = await axios.post('/api/chats/', userIdobj ,config);
      console.log(data);
      if(chats && chats.find((c)=> c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      onClose();
      }catch(error){
      console.log(error)
      toast({
        title: 'Error',
        status: "error",
        description: error.response.data.msg,
        duration: 5000,
        isClosable: true,
      })
    }
    setLoadingChat(false);
}
useEffect(()=>{
  console.log(selectedChat)
},[selectedChat])
  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems='center'backgroundColor="#333333" >
      <Text fontSize="3xl" color="white" fontWeight="bold" fontFamily="work sans" >
            G-Chat
        </Text>
      <Link to='/developer-page' style={{color:'white',marginLeft:'20px',fontFamily:'cursive'}}>
            Developer-page
        </Link>
      </Box>
      
      <Box style={{display: "flex"}} justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
        <Tooltip label="search users to chat" hasArrow placement='bottom-end'>
            <Button variant='ghost' onClick={onOpen}>
            <i className="fas fa-search"></i>
              <Text d={{base: "none",md: "flex"}} px="4">
                Search User
              </Text>
            </Button>
        </Tooltip>
        
        <div>
          <Menu>
            <MenuButton p={1}>
            <BellIcon  fontSize="2xl" m={1}/>
            {notification.length>0 ? <Badge marginLeft="-10px" colorScheme='red'>{notification.length}</Badge>:<></>}
            <MenuList p={2}>
                {notification.length===0 && "No new Messages"}
                { notification.length!==0 && notification.map((notif)=>(
                  <MenuItem key={notif._id}  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}>
                    {notif.chat.isGroupChat ? `New message in ${notif.chat.chat}` : 
                    `New message from ${getSender(user,notif.chat.users)}`}
                  </MenuItem>
                ))}
            </MenuList>

            </MenuButton>
          </Menu>
          <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                  <Avatar size="sm" cursor="pointer" name={user.data.name} src={user.data.pic}/>
              </MenuButton>
              <MenuList fontSize="1xl" fontFamily="sans-serif" fontWeight="bold">
                <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuItem onClick={()=>{
                  localStorage.removeItem('userInfo')
                  navigate('/')
                }}>Log Out</MenuItem>
                <MenuItem>Setting</MenuItem>
                </MenuList> 
          </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
          <DrawerContent>
            <DrawerHeader borderBottomWidth='1px' style={{display: "flex"}} justifyContent="space-between" alignItems="center">
              <Text fontFamily="heading">Search Users</Text>
              <CloseIcon cursor="pointer" onClick={()=>{
                onClose()
              }} />
            </DrawerHeader>
        <DrawerBody>
          <Box display="flex" flexDirection="row"  >
            <Input placeholder="Search by name of email"  mr={2} value={search} onChange={(e)=>{ setSearch(e.target.value)
            
            }} />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          { loading ? (<ChatLoading/>): (searchResult?.map((e) => {
         
        return (
          <UserList key={e._id} user={e} handleFunction={()=> accessChat(e._id)}/>
        );
      }))}
      {loadingChat && <Spinner ml="auto" d="flex" />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
export default SideDrawer

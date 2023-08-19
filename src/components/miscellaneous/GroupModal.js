import { EditIcon, ViewIcon } from '@chakra-ui/icons'
import {  Avatar, Box, Button, IconButton, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatState } from '../../context/createContext'
import axios from 'axios'
import { configure } from '@testing-library/react'
import GroupMemberList from './GroupMemberList'
import UserList from '../UserList'
const GroupModal = ({Group,children}) => {
  const {user,selectedChat,setSelectedChat}= ChatState();

    const loggedUser=JSON.parse(localStorage.getItem('userInfo'))
    const [rename,setRename] = useState(false);
    const [renameValue,setRenameValue]=useState();
    const [isAddUser,setIsAddUser]=useState(false);
    const [loading,setLoading] = useState(false);
    const [searchResult,setSearchResult]=useState();
    const [toAdd ,setToAdd]=useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast=useToast();
    useEffect(()=>{

    },[selectedChat])
   const handleRename=async()=>{
     if(!renameValue){
      toast({
        title: 'Invalid',
        status: "error",
        description: "Group name can not be null",
        duration: 5000,
        isClosable: true,
      })
     }
     else{
      try {
        const config={
          headers:{
            Authorization: `Bearer ${user.data.token}`
          }
        }
        const {data}= await axios.put('/api/chats/rename',{"chatId": selectedChat._id, "chatName": renameValue},config)
        
        setRename(false)
        toast({
          title: 'Successfull',
          status: "success",
          description: "Reload page to update name ",
          duration: 5000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Server',
          status: "error",
          description: "Failed to update ",
          duration: 5000,
          isClosable: true,
        })
      }
     }
   }
   const handleSearch = async (search) => {
    if (!search) {
      setSearchResult([]);
        return;
    }
    else {
        setLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${user.data.token}`,
            },
        }
        try {
            const data = await axios.get(`/api/user?search=${search}`, config);

            setSearchResult(data.data);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }
}
const handleAddGroupMember=async(e)=>{

  if(selectedChat.users.find(curr=> {return e._id===curr._id})){
    toast({
      title: 'Failed',
      status: "error",
      description: "user already exist in the group",
      duration: 5000,
      isClosable: true,
    })
    return;
  }
  else {
try {
  const config = {
    headers: {
        Authorization: `Bearer ${user.data.token}`,
    },
}
  const {data}=await axios.put('/api/chats/groupadd',{"chatId" : selectedChat._id,"userId": e._id},config)
    setSelectedChat(data)
    toast({
      title: 'Updated',
      status: "success",
      description: "New member added to group",
      duration: 5000,
      isClosable: true,
    })
  } catch (error) {
    toast({
      title: 'Failed',
      status: "error",
      description: "Failed to Add",
      duration: 5000,
      isClosable: true,
    })
  }
}
}
  return (
    <>
      {children ? (<span onClick={onOpen}>{children}</span>):(
        <IconButton d={{base: "flex"}}
        icon={<ViewIcon/>} onClick={onOpen}/>
      )}
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent d="flex" alignItems="center" padding="10px">
    <ModalHeader fontSize={{base: "30px",md: "25px"}}>{selectedChat.chatName}{loggedUser.data._id===selectedChat.groupAdmin._id ? (<IconButton d={{base: "flex"}}
        icon={<EditIcon boxSize={7}/>} onClick={()=>{setRename(!rename)}} />):(<></>)}</ModalHeader>
    <ModalCloseButton/>
    <ModalBody display="flex" justifyContent="center" alignItems="center" flexDir='column'>
      <Box display={rename ? "flex": "none"}><Input placeholder='Rename Group' onChange={(e)=>setRenameValue(e.target.value)} mx={3} mb={2} /><Button onClick={handleRename}>Submit</Button></Box>
      
    <Avatar name={Group.chatName} size="2xl" cursor="pointer"></Avatar>
      <Box 
      height="200px"
      overflow="hidden"
      overflowY="scroll"
      >
       { selectedChat.users.map((e)=>{
          return (
                <GroupMemberList member={e}/>
          )
        })}
      </Box>
      <Input placeholder="Search by user name" onChange={(e)=>{handleSearch(e.target.value)}} display={isAddUser ? "flex" : "none"}/>
      {(searchResult?.slice(0, 4).map((e) => {

return (
    <UserList key={e._id} user={e} handleFunction={() => handleAddGroupMember(e)} />
);
}))}
    </ModalBody>
    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button  mr={3} onClick={()=> setIsAddUser(!isAddUser)}>
       Add user
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}
export default GroupModal


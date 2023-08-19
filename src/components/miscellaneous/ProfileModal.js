import { ViewIcon } from '@chakra-ui/icons'
import {  Avatar, Button, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ProfileModal = ({user,children}) => {
    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {children ? (<span onClick={onOpen}>{children}</span>):(
        <IconButton d={{base: "flex"}}
        icon={<ViewIcon/>} onClick={onOpen}/>
      )}
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent d="flex" alignItems="center" padding="20px">
    <ModalHeader>{user.data.name}</ModalHeader>
    <ModalCloseButton/>
    <ModalBody>
      <Avatar size="2xl" cursor="pointer" name={user.data.name} src={user.data.pic} />
      <Text>{user.data.email}</Text>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost' onClick={()=>{
        localStorage.removeItem('userInfo')
        navigate('/');
      }}>Log out</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}
export default ProfileModal

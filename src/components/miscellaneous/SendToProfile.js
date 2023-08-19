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
import { ChatState } from '../../context/createContext'
const SendToProfile = ({user,children}) => {
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
    <ModalHeader>{user.name}</ModalHeader>
    <ModalCloseButton/>
    <ModalBody>
      <Avatar size="2xl" cursor="pointer" name={user.name} src={user.pic} />
      <Text><span> <b>Email: </b>{user.email}</span> </Text>
      <Text><span> <b>Chat start at: </b>{user.createdAt.substring(0,10)}</span> </Text>
    </ModalBody>
    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}
export default SendToProfile

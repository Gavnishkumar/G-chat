import { Avatar, Box,Text } from '@chakra-ui/react';
import React from 'react'

const UserList = ({user,handleFunction}) => {

  return (
    <>
      <Box onClick={handleFunction}  display="flex" _hover={{fontSize:"bold",bg: "#d1d7db"}} width="100%" alignItems="center" cursor="pointer" bg="#E3E3E3" borderRadius="1vw" my="1em" py="0.5em" px="5px" >
            <Avatar name={user.name} src={user.pic}/>
            <Box display="flex" flexDirection="column">
            <Text fontFamily="heading" px="10px" fontSize="20px"> {user.name}</Text>
            <span ><b px="10px">Email:</b> <i fontSize="7px">{user.email} </i></span>
            </Box>
          </Box>
    </>
  )
}

export default UserList

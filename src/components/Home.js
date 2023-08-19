import { Box, Container, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SignUp from './SignUp'
import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const user=localStorage.getItem('userInfo');
    if(user){
        navigate('/chats');
    }
},[navigate])
  return (
    <>
    <Container maxW='500px'>
    <Box display="flex" justifyContent="center" alignItems='center'>
      <Link to='/developer-page' style={{color:'black',fontSize:'3xl',marginLeft:'20px',fontFamily:'cursive',padding:'20px'}}>
          Developer-page
        </Link>
      </Box>
      <Box d='flex'
        justifyContent="center"
        textAlign="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        boarderradius="lg"
        boarderwidth="1px">
        <Text fontSize="4xl" fontFamily="work sans" color="black" > Login to Chat</Text>
      </Box>
      <Box bg="white" w="100%" p={4} boarderwidth="1px">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Login/>
            </TabPanel>
            <TabPanel>
            <SignUp/>
              
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </>
  )
}

export default Home

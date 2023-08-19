import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate();
  const toast=useToast();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [loading,setLoading] =useState(false);
   const [isShow,setIsshow]=useState(false);
    const handleShowPassword=()=>{
      setIsshow(!isShow);
    }
    const handleGuest=()=>{
      setEmail('guest@gmail.com');
      setPassword('iAmGuest');
      document.getElementById('email').value='guest@gmail.com';
      document.getElementById('pass').value='iAmGuest';
    }
   const handleLogin = async ()=>{
    if(!Email || !Password){
      toast({
        title: 'Required',
        description: "Please filled all required field.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    else {
      setLoading(true);
      try {
        const config={
          headers:{
              'content-type': 'application/json',
          },
        }
        const data=await axios.post('/api/user/login',{email: Email,password:Password},config);
        toast({
          title: 'logged in successfully',
          status: "success",
          description: "user logged in successfully",
          duration: 5000,
          isClosable: true,
        })
        setLoading(false);
    
        localStorage.setItem('userInfo',JSON.stringify(data));

        navigate('/chats')
      } catch(error){
        toast({
          title: 'Failed',
          status: "error",
          description: error.response.data.msg,
          duration: 5000,
          isClosable: true,
        })
       setLoading(false);
      }
    }
   }
    return (
        <VStack>
            <FormControl id='userEmail' isRequired="true" spacing='5px'>
                <FormLabel htmlFor='email'>Email address {'\n'} </FormLabel>
                <Input  type='email' id="email" placeholder='Enter your email' onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </FormControl>
            <FormControl  id="userPass" isRequired="true" spacing='5px'>
                    <FormLabel htmlFor='pass' >Password</FormLabel>
                <InputGroup>
                    <Input type={isShow ? 'text' : 'password'} id="pass" placeholder='Enter your password' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <InputRightElement>
                        <Button h='1.75rem'  size='lg' fontFamily={'work sans'} mr={5} onClick={handleShowPassword} >{isShow ? 'Hide' : 'Show'}</Button>
                        
                    </InputRightElement>
                </InputGroup>
           </FormControl>
           <Button colorScheme='blue' width="100%" onClick={handleLogin}> Login </Button>
           <Button colorScheme='red' width="100%" onClick={handleGuest}> Get Guest user id </Button>
</VStack>
  )
}
export default Login

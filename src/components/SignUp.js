import React, { useState } from 'react'

import {
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
    Stack,
    VStack
} from '@chakra-ui/react'
import { Input,useToast} from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
const SignUp = () => {
    const navigate=useNavigate();
    const [Name, setName] = useState();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [Cpassword, setCpassword] = useState();
    const [pic, setPic] = useState();
    const [isShow,setIsshow] = useState(false);
    const [isLoading,setIsLoading]= useState(false);
    const handleShowPassword=()=>{
        setIsshow(!isShow);
    }
    const toast=useToast();
    const postDetail=async(pics)=>{
        setIsLoading(true);
        console.log(pics)
        // if(pics===undefined){
        //     toast({
        //         title: 'Please select an image.',
        //         description: "Dp image is required",
        //         status: "warning",
        //         duration: 5000,
        //         isClosable: true,
        //       })
        // }
        // if(pics.type==="image/jpeg" || pics.type==="image/png"){
            // https://ik.imagekit.io/gavnish/path/to/myimage.jpg
            // const data= new FormData();
            // data.append("file",pics)
            // data.append("upload_preset","dfoolofr")
            // data.append("cloud_name","gavnish")
            // await fetch('https://api.cloudinary.com/v1_1/gavnish/image/upload',{
            //     method: 'post',
            //     headers: { "Content-Type": "image/jpeg" },
            //     body: data
            // }).then((res)=>{
            //     res.json()
            // }).then((data)=>{
            //         // setPic(data.url.toString())
            //         console.log(data);
            //         setIsLoading(false);
            // }).catch((err)=>{
            //     console.log(err);
            //     setIsLoading(false);
            // })
        // }
        // else{
        //     toast({
        //         title: 'Image type',
        //         description: "file is of type jpeg/png only.",
        //         status: "error",
        //         duration: 5000,
        //         isClosable: true,
        //       })
        // }
        
    }
    const onError = err => {
        
        toast({
            title: 'Error',
            description:err,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
      };
      
      const onSuccess = res => {
        
        setPic(res.thumbnailUrl);
        console.log(res.thumbnailUrl)
        setIsLoading(false);

      };
    const handleReset=()=>{
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
        setPic('');
        setIsshow(false);
        document.getElementById('name').value='';
        document.getElementById('email1').value='';
        document.getElementById('pass1').value='';
        document.getElementById('cpass').value='';
        document.getElementById('pic').value='';
        setIsshow(false);
        setIsLoading(false);
    }
    const submitHandler=async()=>{
        if(!Name || !Email || !Password || !Cpassword){
            toast({
                title: 'Required',
                description: "Please filled all required field.",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }
        else if(Password!==Cpassword){
            toast({
                title: 'Password',
                description: "Password and confirm password must be same.",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
        }
        else{
            setIsLoading(true);
            
            try {
                const config={
                    headers:{
                        'content-type': 'application/json',
                    },
                }
                const data=await axios.post('/api/user',{name:Name,email:Email,password:Password,pic:pic},config);
                        toast({
                               title: 'Registered successfully',
                               status: "success",
                               description: "user created successfully",
                               duration: 5000,
                               isClosable: true,
                             })
                navigate('/chats');
                setIsLoading(false);          
                localStorage.setItem('userInfo',JSON.stringify(data));
            } catch (error) {
                console.log(error.response.data.msg);
                toast({
                    title: 'Error',
                    status: "error",
                    description: error.response.data.msg,
                    duration: 5000,
                    isClosable: true,
                  })
                  handleReset();
                  setIsLoading(false);
            }
            setIsLoading(false);
        }
    }
    return (
        <VStack>
            <FormControl  id='Fname' isRequired="true" spacing='5px'>
                <FormLabel htmlFor='name' >Name</FormLabel>
                <Input id="name" placeholder='Enter your Name' onChange={(e) => {
                    setName(e.target.value);
                }} />
            </FormControl >
            <FormControl id='userEmail' isRequired="true" spacing='5px'>
                <FormLabel htmlFor='email1'>Email address {'\n'} </FormLabel>
                <Input  type='email' id="email1" placeholder='Enter your email' onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </FormControl>
            <FormControl  id="userPass" isRequired="true" spacing='5px'>
                    <FormLabel htmlFor='pass1' >Password</FormLabel>
                <InputGroup>
                    <Input type={isShow ? 'text' : 'password'} id="pass1" placeholder='Enter your password' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <InputRightElement>
                        <Button h='1.75rem'  size='lg' fontFamily={'work sans'} mr={5} onClick={handleShowPassword} >{isShow ? 'Hide' : 'Show'}</Button>
                        
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="userConfirmPass" isRequired="true" spacing='5px'>
                    <FormLabel htmlFor='cpass'>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={isShow ? 'text' : 'password'} id="cpass" placeholder='Confirm your password' onChange={(e) => {
                        setCpassword(e.target.value);
                    }} />
                    <InputRightElement>
                        <Button h='1.75rem'  size='lg' fontFamily={'work sans'} mr={5} onClick={handleShowPassword} >{isShow ? 'Hide' : 'Show'}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            {/* <FormControl id='userPic'>
                <FormLabel htmlFor='pic' >Upload picture {'\n'} </FormLabel>
                <Input type='file'  id="pic" placeholder='upload your pic' onChange={(e) => {
                     postDetail(e.target.value);
                }} />
            </FormControl> */}
            <div style={{display: 'flex',flexDirection:'row'}}>
            <FormLabel htmlFor='pic' marginRight={3} > Upload pic</FormLabel>
            <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          onChange={()=>setIsLoading(true)}
          
        />
        </div>
            
            <Button colorScheme='blue'
            width='100%' 
            isLoading={isLoading}
            variant='solid'
             onClick={submitHandler}>Submit</Button>
            <Button colorScheme='red'
             width='100%'
              variant='solid' 
              
              onClick={handleReset} >Reset</Button>
</VStack>
    )
}
export default SignUp

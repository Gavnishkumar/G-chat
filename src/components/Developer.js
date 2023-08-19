import { ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Avatar, Box, IconButton, Image,  Text,  VStack } from '@chakra-ui/react'

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Developer = () => {
  const imageUrl=['https://ik.imagekit.io/gavnish/test-upload_ZXigU0l7S.png?updatedAt=1691840990139','https://ik.imagekit.io/gavnish/test-upload_Oe3Bu3mFi.png?updatedAt=1691840977718','https://ik.imagekit.io/gavnish/test-upload_CiFZbPc0-.png?updatedAt=1691840962857','https://ik.imagekit.io/gavnish/test-upload_72TO1FZRa.png?updatedAt=1691840947094','https://ik.imagekit.io/gavnish/test-upload_WuRRYU9DA.png?updatedAt=1691315539252']
  const navigate=useNavigate();
  const [index,setIndex]=useState(2);
 
 
  return (
    <VStack justifyContent={'center'} width='100%' opacity={1.5} background='#a4f5b9'>
   
      <div style={{height:'60px',background:'grey' , width:'100%',display:'flex',alignItems:'center',justifyContent: 'space-between'}}>
      <span style={{display:'flex',justifyContent:'center'}}>
      <IconButton
        display={{base: "flex"}}
        marginLeft='10px'
        icon={<ArrowBackIcon/>}
        onClick={()=>navigate('/chats')}
        />
        <Text fontWeight='bold' fontSize='2xl' marginLeft={3}>G-Chat</Text>
        </span>
        <Text fontWeight='bold' fontSize='xl' marginRight='10px'>Developer page</Text>
      </div>
      <div style={{width:'50%',display:'flex',justifyContent: 'center',alignItems:'center',margin:'auto'}}>
        
     <ArrowLeftIcon  fontSize={'3xl'} _hover={{cursor:'pointer'}} onClick={()=>setIndex((index+1)%5)}/>
        <Avatar style={{margin:'4px'}} src={imageUrl[index-1]}></Avatar>
        
        <Image style={{margin:'4px',borderRadius:'1000px',width:'2xl', height:'2xl'}}  src={imageUrl[index]}></Image>
        <Avatar style={{margin:'4px'}}  src={imageUrl[index+1]}></Avatar>
        <ArrowRightIcon fontSize={'3xl'} _hover={{cursor:'pointer'}} onClick={()=>{
          if(index===0) setIndex(4)
          else setIndex((index-1)%5)}}/>
      </div>
        <Text fontSize={'4xl'} fontWeight={'bold'}>Gavnish Kumar</Text>
      <div style={{width:'60%',height:'600px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',margin:'auto'}}>
        <i style={{Size:'3xl',fontWeight:'bold',color:'black'}}>Indian institute of information Technology,Sonepat(IIITS)</i>
        <Box style={{width:'100%',height:'500px',fontWeight:'bolder'}}>
          <Text>This web chat application is designed by Gavnish kumar.During his B-Tech academic program
            Your data and chats are completly secured,
            only developer can access.
          </Text>
          <Text>
          Please give your feedback,experience, suggestions and mistakes on my social media handle or GavnishOfficial on G-chat.
          </Text>
          <div style={{display:'flex',flexDirection:'row'}}>
            <Link to="https://wa.me/9368985917?text=*Share your experience...*" target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_uIg2BGf6U.png?updatedAt=1691835529456'></Image></Link>
            <Link to='https://www.instagram.com/gavnish_thakur/?hl=en' target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_z10OudiNZ.png?updatedAt=1691835657194'></Image></Link>
            <Link to='https://www.facebook.com/gavnish.kumar.94/' target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_7CAgMBYUR.png?updatedAt=1691835649744'></Image></Link>
            <Link to='https://www.linkedin.com/in/gavnish-kumar-70b847233/' target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_W4M9bv4W6.png?updatedAt=1691835637198'></Image></Link>
          </div>
          <b>Skill profile</b>
          <div style={{display:'flex',flexDirection:'row'}}>
            <Link to='https://leetcode.com/gavnish_kumar/' target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_odwHP3wFw.png?updatedAt=1691835627515'></Image></Link>
            <Link to='https://auth.geeksforgeeks.org/user/gk991789/practice' target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_UHMOkJS_y.png?updatedAt=1691835744533'></Image></Link>
            <Link to='https://github.com/Gavnishkumar' target='_blank'><Image style={{width:'40px',height:'40px',margin:'3px'}} src='https://ik.imagekit.io/gavnish/test-upload_zXfDlEhsl.png?updatedAt=1691836678652'></Image></Link>
          </div>
        </Box>
      </div>
      
      </VStack>
  )
}

export default Developer

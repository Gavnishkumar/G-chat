import React, { useEffect, useRef } from 'react'
import { ChatState } from '../context/createContext'
import { Avatar, Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender,getSenderObj} from '../config/ChatLogics';
import SendToProfile from './miscellaneous/SendToProfile';
import GroupModal from './miscellaneous/GroupModal';
import { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ScrollableChat from './ScrollableChat';
import mygif from '../images/icons8-typing.gif';
import NotificationSound from '../notification/sneej.mp3';
import '../App.css'
import useSound from 'use-sound';

const ENDPOINT= "http://localhost:5000";

var socket,selectedChatCompare;

const SingleChat = ({fetchAgain,setFetchAgain}) => {
  const [messages,setMessages]= useState([]);
  const [loading,setLoading] = useState(false);
  const [newMessage,setNewMessage]=useState();
  const [socketConnected,setSocketConnected]= useState(false);
  const [isTyping, setIsTyping]=useState(false);
  const [typing,setTyping] = useState(false);
  const [play] = useSound(NotificationSound);
    const {user,selectedChat,setSelectedChat,notification,setNotification}= ChatState();
    useEffect(()=>{
      socket=io(ENDPOINT);
      socket.emit('setup',user)
      // eslint-disable-next-line
      socket.on("connected",()=>{
          setSocketConnected(true);
      })
      socket.on('typing',()=> setIsTyping(true));
      socket.on('stop typing',()=>setIsTyping(false));
    },[])
    const fetchMessages= async()=>{
      if(selectedChat){
        setLoading(true)
        try {
          const config={
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.data.token}`
            }
          }
          const {data}= await axios.get(`/api/message/${selectedChat._id}`,config);
          
          setMessages(data)
          socket.emit("join chat",selectedChat._id)
        } catch (error) {
          console.log(error.message)
        }
        setLoading(false);
      }
    }
useEffect(()=>{
fetchMessages();
// eslint-disable-next-line
selectedChatCompare=selectedChat;
},[selectedChat])
useEffect(()=>{
  socket.on('message received',(newMessageRecieved)=>{
    if(!selectedChatCompare || selectedChatCompare._id!==newMessageRecieved.chat._id){
      play()
      if(!notification.includes(newMessageRecieved)){
        setNotification([newMessageRecieved,...notification]);
        setFetchAgain(!fetchAgain);
      }
    }
    else{
      setMessages([...messages,newMessageRecieved])
    }
  });
})
    const sendMessage=async (events)=>{
     
      if(events.key==='Enter' && newMessage){
        socket.emit("stop typing",selectedChat._id)
        try {
          const config={
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.data.token}`
            }
          }
          setNewMessage("");
          const {data}= await axios.post('/api/message',{"content": newMessage,"chatId": selectedChat._id},config);
         socket.emit('new message',data)
         setMessages([...messages,data])
        } catch (error) {
          console.log(error.messages);
        }
      }
    }
    var lastTypingTime;
    const typingHandler=(e)=>{
      
      setNewMessage(e.target.value);
      if(!socketConnected) return;
      if(!typing){
        setTyping(true);
        socket.emit('typing',selectedChat._id)
      }
      var timmerLength= 5000;
      lastTypingTime= new Date().getTime()
      setTimeout(()=>{
        var timenow= new Date().getTime();
        var timeDiff= timenow - lastTypingTime;
        if(typing && timeDiff>= timmerLength){
          socket.emit('stop typing',selectedChat._id);
          setTyping(false);
        }
       },[timmerLength]);
    }
  

    // const audioPlayer = useRef(null);
    // const playAudio=()=> {
    //   audioPlayer.current.play();
    // }
  return (
    <>
    
      {selectedChat ? (<>
      <Text
      fontSize={{base: "28px", md: "30px"}}
      pb={3}
      py={3}
      px={2}
        w="100%"
        fontFamily="work sans"
        display="flex"
        justifyContent={{base: "space-between"}}
        alignItems="center"
        borderRadius="7px"
       
      >
        <IconButton 
        display={{base: "flex",md:"none"}}
        icon={<ArrowBackIcon/>}
        onClick={()=>setSelectedChat("")}
        />
        {!selectedChat.isGroupChat ? (<>
        <span><Avatar name={getSender(user,selectedChat.users)} src={getSenderObj(user,selectedChat.users).pic} mx={3}/>
            {getSender(user,selectedChat.users)}</span>
            <SendToProfile user={getSenderObj(user,selectedChat.users)}></SendToProfile>
        </>) : (<>  <span><Avatar name={selectedChat.chatName} mx={3}/>
            {selectedChat.chatName}</span>
            <GroupModal Group={selectedChat}></GroupModal></>)}
      </Text>
      <Box
      className='mychatbox'
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      // bg="#E8E8E8"
      
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
      >
       {loading ? (<Spinner size="xl" w={20} h={20} alignSelf="center" m="auto"/>):(<>
       
          <ScrollableChat messages={messages}/>
       </>)}
       {isTyping ? <img src={mygif} height="10px" width="40px" margin="4px"/>:<></>}
        <FormControl onKeyDown={sendMessage}>
          <Input variant='filled'
          bg='#E0E0E0' 
          placeholder='Enter a message'
          onChange={typingHandler}
          marginTop={3}
          value={newMessage} />
        </FormControl>
      </Box>
      </>) : (<Box display="flex" 
      justifyContent="center"
       alignItems="center"
       width="100%"
       height="100%">
        <Text fontSize="3xl" fontFamily="work sans">Click user start chatting</Text>
      </Box>)}

      {/* <audio ref={audioPlayer} src={NotificationSound} muted="true" /> */}
    </>
  )
}
export default SingleChat

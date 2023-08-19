
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/createContext';
import { Box } from '@chakra-ui/react';
import SideDrawer from './miscellaneous/SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
 
  const navigate= useNavigate();
  const [fetchAgain,setFetchAgain]= useState(false);
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem('userInfo'));
     // eslint-disable-next-line react-hooks/exhaustive-deps
    if(!userInfo){
        navigate("/");
    }
    setFetchAgain(false)
},);

    const {user} = ChatState();
      return( 
     
        <div style={{width: "100%"}}>
          { user && <SideDrawer/> }
          <Box style={{display: "flex", justifyContent: "space-between", width: "100%", height: "91.5vh" }}>
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
          </Box>
        </div>
       
      )
  
};

export default Chat

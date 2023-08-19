import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
// import { useNavigate } from 'react-router-dom';
const chatContext= createContext();
const ChatProvider = ({children}) => {
  // const navigate=useNavigate();
    const [user,setUser]= useState();
    const [selectedChat, setSelectedChat]=useState();
    const [chats,setChats]=useState();
    const [notification,setNotification]=useState([]);
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);
    },[]);
  
  return (<chatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats ,notification,setNotification}}>{children}</chatContext.Provider>);
}
export const ChatState=()=>{
    return useContext(chatContext);
}
export default ChatProvider;
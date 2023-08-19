export const getSender=( loggedUser,users)=>{
  if(!users || loggedUser.length===0) return;
  console.log(users)
  console.log(loggedUser)
    return users[0]._id===loggedUser.data._id ? users[1].name: users[0].name;
};
export const getSenderPic=(loggedUser,users)=>{
    if(!users || loggedUser.length===0) return;
    return users[0]._id===loggedUser.data._id ? users[1].pic : users[0].pic;
  
};
export const getSenderObj=( loggedUser,users)=>{
  if(!users || loggedUser.length===0) return;
    return users[0]._id===loggedUser.data._id ? users[1] : users[0];
};

export const isSameSender=(messages,m,i,userId)=>{
    return ( 
        i<messages.length-1 && (messages[i+1].sender._id !== m.sender._id || messages[i+1]===undefined ) && messages[i].sender._id!==userId._id
    )
}

export const isLastMessage=(messages,i,userId)=>{
    return (
        i===messages.length-1 && messages[messages.length-1].sender._id!==userId && messages[messages.length-1].sender._id
    )
}
export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
      
    )
      return 12;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) 
        ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
     
    )
      return 12;
    else return "auto";
  };
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
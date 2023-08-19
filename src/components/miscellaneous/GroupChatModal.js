import React, {  useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    Input,
    useToast,
    Box,

} from '@chakra-ui/react'
import axios from 'axios';
import UserList from '../UserList';
import { ChatState } from '../../context/createContext';
import UserBadgeItem from '../Avatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, chats, setChats} = ChatState();
    const [groupName, setGroupName] = useState();

    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [groupCreateLoading,setGroupCreateLoading]=useState(false);
    const handleDeleteUser = (ToDelete) => {
        if (selectedUsers.includes(ToDelete)) {
            setSelectedUsers(selectedUsers.filter((sel) => sel._id !== ToDelete._id));
        }
    }
useEffect(()=>{
    
},[chats])
    const handleGroupName = (gName) => {
        setGroupName(gName);
       
    }
    const handleGroupMember = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'Error',
                status: "error",
                description: "User already exist in the group",
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
       
    }
    const handleSearch = async (search) => {
        if (!search) {
            return;
        }
        else {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.token}`,
                },
            }
            try {
                const data = await axios.get(`/api/user?search=${search}`, config);

                setSearchResult(data.data);
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        }
    }
    const handleCreateGroup=async()=>{
        if(searchResult.length<2){
            toast({
                title: 'Error',
                status: "error",
                description: "There must be at least two users to create group",
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        else if(!groupName){
            toast({
                title: 'Group name',
                status: "error",
                description: "Group name can not be null",
                duration: 5000,
                isClosable: true,
            })
            return;
        }
        else{
            setGroupCreateLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.data.token}`,
                    },
                }
                const {data}=await axios.post('/api/chats/group',{"name": groupName,"users": JSON.stringify(selectedUsers)},config);
                setChats([data,...chats]);
                onClose();
                toast({
                    title: 'Created',
                    status: "success",
                    description: "New Group chat created",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                })
            } catch (error) {
                toast({
                    title: 'Error',
                    status: "error",
                    description: "error.message",
                    duration: 5000,
                    isClosable: true,
                })
            }
            setGroupCreateLoading(false)
           
        }
    }
    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl pb={3}>
                            <Input placeholder='Group name' onChange={(e) => handleGroupName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add participants' mb={1} onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        {
                            <Box w="100%" d="flex" flexWrap="wrap">
                                {selectedUsers.map((u) => (
                                    <UserBadgeItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleDeleteUser(u)}
                                    />
                                ))}
                            </Box>

                        }
                        {(searchResult?.slice(0, 4).map((e) => {

                            return (
                                <UserList key={e._id} user={e} handleFunction={() => handleGroupMember(e)} />
                            );
                        }))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='green' isLoading={groupCreateLoading} mr={3} onClick={handleCreateGroup}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal

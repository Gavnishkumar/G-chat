
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { IKContext, IKImage } from 'imagekitio-react';


import Home from './components/Home';
import Chat from './components/Chat';
import Developer from './components/Developer';

const urlEndpoint = 'https://ik.imagekit.io/gavnish';
const publicKey = 'public_Zvr1dcEpVsbSPVIOGr7YfZwFdHM='; 
const authenticationEndpoint = 'http://localhost:5000/imageauth';
function App() {
  return (
    <div className='App'>
       <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticationEndpoint={authenticationEndpoint}
      >
       
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/Chats' element={<Chat/>}></Route>
        <Route exact path='/developer-page' element={<Developer/>}></Route>
      </Routes>
      </IKContext>
    
    </div>
  );
}

export default App;

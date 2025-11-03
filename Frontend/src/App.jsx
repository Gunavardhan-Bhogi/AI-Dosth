import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from './MyContext.jsx';
import { useState, useEffect } from 'react';
import { v1 as uuidv1} from "uuid";

const getInitialState = (key, defaultvalue) => {
  const saved = localStorage.getItem(key);
  if(saved){
    return JSON.parse(saved);
  }
  return defaultvalue;
};

const generateNewId = () => uuidv1();

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);

  const [currThreadId, setCurrThreadId] = useState(() => 
  getInitialState('currThreadId', generateNewId())
  );

  const [prevChats, setPrevChats] = useState([]);

  const [newChat, setNewChat] = useState(getInitialState('newChat', true));
  const [allThreads, setAllThreads] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('currThreadId',JSON.stringify(currThreadId));
    localStorage.setItem('newChat', JSON.stringify(newChat));
  },[currThreadId, newChat]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    isPrinting, setIsPrinting,
    isSideBarOpen, setIsSideBarOpen,
  };

  return (
    <div className="app">
      <MyContext.Provider value = {providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App

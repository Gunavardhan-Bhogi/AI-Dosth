import './ChatWindow.css';
import Chat from "./Chat.jsx";
import { MyContext } from './MyContext.jsx';
import { useContext, useState, useEffect } from 'react';
import {HashLoader} from 'react-spinners';

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, setNewChat, isPrinting, isSideBarOpen, setIsSideBarOpen} = useContext(MyContext);
    const [loading, setLoading] = useState(false);

    const isUIBusy = loading || isPrinting;

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);
        const options = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };
        try{
           const response =  await fetch("http://localhost:8080/api/chat", options);
           const res = await response.json();
           console.log(res.reply);
           setReply(res.reply);
        }catch(err) {
                console.log(err);
        }
        setLoading(false);
    }

    //append new chat to prevChats
    useEffect( () => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats,{
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ))
        }

        setPrompt("");
    },[reply]);

    return (
        <div className='chatWindow'>
            <div className="navbar">
                <button
                className='menu-toggle'
                onClick={() => setIsSideBarOpen(true)}
                ><i className='fa-solid fa-bars'></i></button>
                <span>AI Dosth <i className="fa-solid fa-chevron-down"></i></span>
            </div>
            <Chat></Chat>
            <HashLoader color='white' loading = {loading}>

            </HashLoader>
            <div className="chatInput">
                <div className="inputBox">
                    <input type="text"placeholder='Ask anything' value = {prompt}
                        onChange = {(e) => setPrompt(e.target.value)} onKeyDown = {(e) => e.key === 'Enter'  && !isUIBusy && getReply()}/>
                    <div id='submit' onClick={ !isUIBusy ? getReply:null } className={isUIBusy ? 'send-button-disabled' : 'send-button-enabled'}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>
                <p className='info'> AI Dosth can make mistakes. Check important info.</p>
            </div>
        </div>
    )
};

export default ChatWindow;
import "./Sidebar.css";
import { useContext,useEffect } from "react";
import {MyContext}from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, isSideBarOpen, setIsSideBarOpen, newChat} = useContext(MyContext);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    const getAllThreads = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/thread`);
            const res = await response.json();
            const filteredData  = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            //console.log(filteredData);
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchThreadHistory = async (threadId) => {
        if (!threadId) return;
        try {
            const response = await fetch(`${BACKEND_URL}/api/thread/${threadId}`);
            const res = await response.json();

            if (res.messages && res.messages.length > 0) {
                 setPrevChats(res.messages);
                 setNewChat(false);
            } else {
                 setPrevChats([]);
                 setNewChat(true);
            }
        } catch (error) {
            console.error("Error fetching history on refresh:", error);
            createNewChat();
        }
    }

    useEffect( () => {
        getAllThreads();
    },[currThreadId]);

    useEffect(() => {
        if(!newChat && allThreads.length>0 && currThreadId){
            fetchThreadHistory(currThreadId);
        }
    },[allThreads.length]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        await fetchThreadHistory(newThreadId);
        setReply(null);
    }

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/thread/${threadId}`, {method: "DELETE"});
            const res = response.json();
            console.log(res);

            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if(threadId === currThreadId){
                createNewChat();
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className={`sidebar ${isSideBarOpen? 'sidebar-mobile-open' : ''}`}>
            <div className="sidebar-header-mobile">
                <button onClick={createNewChat} className="new-chat-btn">
                <img className="logo" src="/newlogo.png" alt="logo" />
                <span>New Chat</span>
                <i className="fa-solid fa-pen-to-square"></i>
                </button>

            <button
            className="close-sidebar-btn"
            onClick={() => setIsSideBarOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
            </button>
            </div>

            <ul className="history">
                {
                    allThreads?.map((thread,idx) =>(
                        <li key={idx}
                        onClick={(e) => changeThread(thread.threadId)}
                        >{thread.title}
                        <i className="fa-solid fa-trash"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                        }}
                        ></i></li>
                    ))
                }
            </ul>

            <div className="sign">
                <p>By AI Dosth &hearts;</p>
            </div>
        </section>
    );
}

export default Sidebar;
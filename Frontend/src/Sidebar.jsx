import "./Sidebar.css";
import { useContext,useEffect } from "react";
import {MyContext}from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const {allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats, isSideBarOpen, setIsSideBarOpen} = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData  = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            //console.log(filteredData);
            setAllThreads(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect( () => {
        getAllThreads();
    },[currThreadId]);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            setPrevChats(res.messages);
            setNewChat(false);
            setReply(null);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${threadId}`, {method: "DELETE"});
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
                <img className="logo" src="src/assets/newlogo.png" alt="logo" />
                <span><i className="fa-solid fa-pen-to-square"></i></span>
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
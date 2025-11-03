import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/test", async(req, res) =>{
    try {
        const thread = new Thread({
            threadId: "tid",
            title: "testing"
        });

        const response = await thread.save();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to save"});
    }
});

router.get("/thread", async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);

    } catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch threads"});
    }
});

router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error: "Thread not found"});
        }
        res.json(thread);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch chat"});
    }
});

router.delete("/thread/:threadId", async (req,res) => {
    const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error: "Thread not found"});
        }
        res.status(200).json({success : "Thread deleted successfully"});
    } catch (error) {
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
});

router.post("/chat", async(req, res) => {
    const {threadId, messages} = req.body;
    const latestUserMessage = messages[messages.length-1].content;

    if(!threadId || !messages || messages.length === 0){
        res.status(400).json({error: "Missing threadId or empty message history"});
    }

    try{
        let thread = await Thread.findOne({threadId});
        if(!thread){
            thread = new Thread({
                threadId,
                title: latestUserMessage,
                messages: messages
            });
        }else{
            thread.messages = messages;
        }
        const assistantReply = await getOpenAIAPIResponse(messages);
        
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        res.json({reply:assistantReply});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Something went wrong during chat processing"});
    }
});

export default router;
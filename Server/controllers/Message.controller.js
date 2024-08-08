import Message from "../models/Message.models.js"
import { mkdirSync, renameSync } from 'fs';

const getMessages = async (req, res, next) => {
    try {
        console.log(req.userId);
        const user1 = req.userId;
        const user2 = req.body.id;

        console.log("User 1: " + user1 + " User 2: " + user2);

        if (!user1 || !user2)
            return res.status(400).send("Both user ID's are required.")

        const messages = await Message.find({
            $or: [
                { sender: user1, recipient: user2 },
                { sender: user2, recipient: user1 }
            ],
        }).sort({ timestamp: 1 });

        return res.status(200).json({ messages });

    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}

const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("File is required");
        }
        
        const date = Date.now();
        let fileDir = `uploads/files/${date}`;
        let fileName = `${fileDir}/${req.file.originalname}`;

        mkdirSync(fileDir, { recursive: true });
        renameSync(req.file.path, fileName);
        console.log(fileName)

        return res.status(200).json({ filePath: fileName });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal server error")
    }
}

export { getMessages, uploadFile }
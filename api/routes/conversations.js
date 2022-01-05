const router = require("express").Router();
const Conversation = require('../models/Conversation')

// Create new conversation
router.post("/", async (req, res) => {
    const newConversation = await new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch(err) {
        res.send('Something went wrong')
    }
})
// get conversation
router.get("/:userId", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversations)
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = router
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({ text: req.body.text, user: req.userId });
    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("user", "username");
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};

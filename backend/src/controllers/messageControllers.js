import cloudinary from "../config/cloudniary.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in login controller");
  }
}

export async function getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { myId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in get messages controller");
  }
}

export async function sendMessage(req, res) {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json({ newMessage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in send messageg  controller");
  }
}

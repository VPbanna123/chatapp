import Message from '../models/Message.js';
import User from '../models/User.js';
import Group from '../models/Group.js';
import mongoose from 'mongoose'; // Added

// Send message (one-to-one or group)
export const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id; //  Get sender from JWT
    const { recipient, group, content, messageType, fileUrl, fileName, fileSize, replyTo } = req.body;

    // Validation
    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    if (!recipient && !group) {
      return res.status(400).json({
        success: false,
        message: 'Either recipient or group is required'
      });
    }

    // Create message
    const message = await Message.create({
      sender,
      recipient: recipient || null,
      group: group || null,
      content,
      messageType: messageType || 'text',
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      fileSize: fileSize || null,
      replyTo: replyTo || null
    });

    // Populate sender details
    await message.populate('sender', 'username avatar');
    
    if (replyTo) {
      await message.populate('replyTo', 'content sender');
    }

    // Update last message in group
    if (group) {
      await Group.findByIdAndUpdate(group, {
        lastMessage: message._id,
        lastMessageAt: Date.now()
      });
    }

    res.status(201).json({
      success: true,
      message
    });

  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id; //  From JWT
    const { otherUserId } = req.query;
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    if (!otherUserId) {
      return res.status(400).json({
        success: false,
        message: 'Other user ID is required'
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: otherUserId },
        { sender: otherUserId, recipient: userId }
      ],
      isDeleted: false
    })
    .populate('sender', 'username avatar')
    .populate('recipient', 'username avatar')
    .populate('replyTo', 'content sender')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

    res.status(200).json({
      success: true,
      messages: messages.reverse(), // Reverse to show oldest first
      hasMore: messages.length === limit
    });

  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// Get group messages
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.query;
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required'
      });
    }

    //  Verify user is member of group
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    const isMember = group.members.some(
      m => m.user.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: 'You are not a member of this group'
      });
    }

    const messages = await Message.find({
      group: groupId,
      isDeleted: false
    })
    .populate('sender', 'username avatar')
    .populate('replyTo', 'content sender')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

    res.status(200).json({
      success: true,
      messages: messages.reverse(),
      hasMore: messages.length === limit
    });

  } catch (error) {
    console.error('Get group messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching group messages',
      error: error.message
    });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.body;
    const userId = req.user._id; //  From JWT

    if (!messageId) {
      return res.status(400).json({
        success: false,
        message: 'Message ID is required'
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // For one-to-one messages
    if (message.recipient && message.recipient.toString() === userId.toString()) {
      message.isRead = true;
      await message.save();
    }

    // For group messages
    if (message.group) {
      const alreadyRead = message.readBy.some(r => r.user.toString() === userId.toString());
      if (!alreadyRead) {
        message.readBy.push({ user: userId, readAt: Date.now() });
        await message.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Message marked as read'
    });

  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking message as read',
      error: error.message
    });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.body;
    const userId = req.user._id; //  From JWT
    if (!messageId) {
      return res.status(400).json({
        success: false,
        message: 'Message ID is required'
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Only sender can delete
    if (message.sender.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own messages'
      });
    }

    message.isDeleted = true;
    message.deletedAt = Date.now();
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });

  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
};

// Get recent conversations
export const getRecentConversations = async (req, res) => {
  try {
    const userId = req.user._id; // From JWT

    // Get recent one-to-one conversations
    const recentMessages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId), recipient: { $ne: null } },
            { recipient: new mongoose.Types.ObjectId(userId) }
          ],
          isDeleted: false
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', new mongoose.Types.ObjectId(userId)] },
              '$recipient',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          user: {
            _id: 1,
            username: 1,
            avatar: 1,
            isOnline: 1,
            lastSeen: 1
          },
          lastMessage: 1
        }
      },
      {
        $sort: { 'lastMessage.createdAt': -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      conversations: recentMessages
    });

  } catch (error) {
    console.error('Get recent conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching conversations',
      error: error.message
    });
  }
};

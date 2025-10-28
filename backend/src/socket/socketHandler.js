import Message from '../models/Message.js';
import User from '../models/User.js';

const userSockets = new Map(); // Map userId to socketId

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(' User connected:', socket.id);

    // User joins
    socket.on('user:join', async (userId) => {
      try {
        userSockets.set(userId, socket.id);
        socket.userId = userId;

        // Update user online status
        await User.findByIdAndUpdate(userId, {
          isOnline: true,
          lastSeen: Date.now()
        });

        // Broadcast to all users that this user is online
        socket.broadcast.emit('user:online', { userId, isOnline: true });

        console.log(`User ${userId} joined with socket ${socket.id}`);
      } catch (error) {
        console.error('User join error:', error);
      }
    });

    // Join conversation room (one-to-one)
    socket.on('conversation:join', ({ userId, otherUserId }) => {
      const roomId = [userId, otherUserId].sort().join('-');
      socket.join(roomId);
      console.log(`User ${userId} joined conversation room: ${roomId}`);
    });

    // Join group room
    socket.on('group:join', ({ groupId }) => {
      socket.join(`group-${groupId}`);
      console.log(`User joined group room: group-${groupId}`);
    });

    // Send message (one-to-one)
    socket.on('message:send', async (data) => {
      try {
        const { sender, recipient, content, messageType, fileUrl, fileName, fileSize, replyTo } = data;

        // Create message in DB
        const message = await Message.create({
          sender,
          recipient,
          content,
          messageType: messageType || 'text',
          fileUrl,
          fileName,
          fileSize,
          replyTo
        });

        await message.populate('sender', 'username avatar');
        
        if (replyTo) {
          await message.populate('replyTo', 'content sender');
        }

        // Send to conversation room
        const roomId = [sender, recipient].sort().join('-');
        io.to(roomId).emit('message:receive', message);

        // Send notification to recipient if online
        const recipientSocketId = userSockets.get(recipient);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('notification:new', {
            type: 'message',
            from: sender,
            message: content,
            timestamp: Date.now()
          });
        }

        console.log('Message sent:', message._id);
      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('message:error', { message: 'Failed to send message' });
      }
    });

    // Send group message
    socket.on('group:message:send', async (data) => {
      try {
        const { sender, group, content, messageType, fileUrl, fileName, fileSize, replyTo } = data;

        // Create message in DB
        const message = await Message.create({
          sender,
          group,
          content,
          messageType: messageType || 'text',
          fileUrl,
          fileName,
          fileSize,
          replyTo
        });

        await message.populate('sender', 'username avatar');
        
        if (replyTo) {
          await message.populate('replyTo', 'content sender');
        }

        // Send to group room
        io.to(`group-${group}`).emit('group:message:receive', message);

        console.log('Group message sent:', message._id);
      } catch (error) {
        console.error('Send group message error:', error);
        socket.emit('message:error', { message: 'Failed to send group message' });
      }
    });

    // Typing indicator (one-to-one)
    socket.on('typing:start', ({ userId, otherUserId }) => {
      const recipientSocketId = userSockets.get(otherUserId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('typing:user', { userId, isTyping: true });
      }
    });

    socket.on('typing:stop', ({ userId, otherUserId }) => {
      const recipientSocketId = userSockets.get(otherUserId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('typing:user', { userId, isTyping: false });
      }
    });

    // Typing indicator (group)
    socket.on('group:typing:start', ({ userId, groupId, username }) => {
      socket.to(`group-${groupId}`).emit('group:typing:user', { userId, username, isTyping: true });
    });

    socket.on('group:typing:stop', ({ userId, groupId }) => {
      socket.to(`group-${groupId}`).emit('group:typing:user', { userId, isTyping: false });
    });

    // Mark message as read
    socket.on('message:read', async ({ messageId, userId }) => {
      try {
        const message = await Message.findById(messageId);
        if (message && message.recipient.toString() === userId) {
          message.isRead = true;
          await message.save();

          // Notify sender
          const senderSocketId = userSockets.get(message.sender.toString());
          if (senderSocketId) {
            io.to(senderSocketId).emit('message:read:confirm', { messageId });
          }
        }
      } catch (error) {
        console.error('Mark as read error:', error);
      }
    });

    // User disconnect
    socket.on('disconnect', async () => {
      try {
        const userId = socket.userId;
        
        if (userId) {
          userSockets.delete(userId);

          // Update user offline status
          await User.findByIdAndUpdate(userId, {
            isOnline: false,
            lastSeen: Date.now()
          });

          // Broadcast to all users that this user is offline
          socket.broadcast.emit('user:offline', { userId, isOnline: false });

          console.log(`User ${userId} disconnected`);
        }

        console.log('❌ User disconnected:', socket.id);
      } catch (error) {
        console.error('Disconnect error:', error);
      }
    });
  });
};

export { userSockets };

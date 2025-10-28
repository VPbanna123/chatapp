import { createContext, useContext, useEffect, useState } from 'react';
import { initializeSocket, disconnectSocket, getSocket } from '../services/socket';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState(new Map());

  useEffect(() => {
    if (isAuthenticated && user) {
      const socketInstance = initializeSocket(user.id);
      setSocket(socketInstance);

      // Listen for online/offline events
      socketInstance.on('user:online', ({ userId }) => {
        setOnlineUsers(prev => new Set([...prev, userId]));
      });

      socketInstance.on('user:offline', ({ userId }) => {
        setOnlineUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      });

      // Listen for typing events
      socketInstance.on('typing:user', ({ userId, isTyping }) => {
        setTypingUsers(prev => {
          const newMap = new Map(prev);
          if (isTyping) {
            newMap.set(userId, true);
          } else {
            newMap.delete(userId);
          }
          return newMap;
        });
      });

      // Listen for notifications
      socketInstance.on('notification:new', (notification) => {
        toast.info(`New message from ${notification.from}`);
      });

      return () => {
        disconnectSocket();
        setSocket(null);
      };
    }
  }, [isAuthenticated, user]);

  // Join conversation room
  const joinConversation = (otherUserId) => {
    if (socket && user) {
      socket.emit('conversation:join', { userId: user.id, otherUserId });
    }
  };

  // Join group room
  const joinGroup = (groupId) => {
    if (socket) {
      socket.emit('group:join', { groupId });
    }
  };

  // Send message
  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit('message:send', messageData);
    }
  };

  // Send group message
  const sendGroupMessage = (messageData) => {
    if (socket) {
      socket.emit('group:message:send', messageData);
    }
  };

  // Typing indicators
  const startTyping = (otherUserId) => {
    if (socket && user) {
      socket.emit('typing:start', { userId: user.id, otherUserId });
    }
  };

  const stopTyping = (otherUserId) => {
    if (socket && user) {
      socket.emit('typing:stop', { userId: user.id, otherUserId });
    }
  };

  const startGroupTyping = (groupId) => {
    if (socket && user) {
      socket.emit('group:typing:start', { 
        userId: user.id, 
        groupId, 
        username: user.username 
      });
    }
  };

  const stopGroupTyping = (groupId) => {
    if (socket && user) {
      socket.emit('group:typing:stop', { userId: user.id, groupId });
    }
  };

  // Mark message as read
  const markMessageAsRead = (messageId) => {
    if (socket && user) {
      socket.emit('message:read', { messageId, userId: user.id });
    }
  };

  const value = {
    socket,
    onlineUsers,
    typingUsers,
    joinConversation,
    joinGroup,
    sendMessage,
    sendGroupMessage,
    startTyping,
    stopTyping,
    startGroupTyping,
    stopGroupTyping,
    markMessageAsRead,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

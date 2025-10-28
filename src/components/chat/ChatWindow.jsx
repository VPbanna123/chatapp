// // import { useState, useEffect } from 'react';
// // import { useAuth } from '../../context/AuthContext';
// // import { useSocket } from '../../context/SocketContext';
// // import { messageAPI } from '../../services/api';
// // import ChatHeader from './ChatHeader';
// // import MessageList from './MessageList';
// // import MessageInput from './MessageInput';
// // import Loader from '../common/Loader';
// // import { MessageSquare, Sparkles } from 'lucide-react';

// // const ChatWindow = ({ selectedContact, isGroup = false, onBack }) => {
// //   const { user } = useAuth();
// //   const { socket, sendMessage, sendGroupMessage, joinConversation, joinGroup, startTyping, stopTyping, startGroupTyping, stopGroupTyping } = useSocket();
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [replyTo, setReplyTo] = useState(null);
// //   const [typingUser, setTypingUser] = useState(null);

// //   useEffect(() => {
// //     if (selectedContact) {
// //       loadMessages();
      
// //       if (isGroup) {
// //         joinGroup(selectedContact._id);
// //       } else {
// //         joinConversation(selectedContact._id || selectedContact.id);
// //       }
// //     }
// //   }, [selectedContact]);

// //   useEffect(() => {
// //     if (!socket) return;

// //     const handleNewMessage = (message) => {
// //       setMessages(prev => [...prev, message]);
// //     };

// //     const handleGroupMessage = (message) => {
// //       setMessages(prev => [...prev, message]);
// //     };

// //     const handleTyping = ({ userId, isTyping }) => {
// //       if (isTyping && selectedContact && (userId === selectedContact._id || userId === selectedContact.id)) {
// //         setTypingUser(selectedContact);
// //       } else {
// //         setTypingUser(null);
// //       }
// //     };

// //     const handleGroupTyping = ({ userId, username, isTyping }) => {
// //       if (isTyping && userId !== user.id) {
// //         setTypingUser({ username });
// //       } else {
// //         setTypingUser(null);
// //       }
// //     };

// //     socket.on('message:receive', handleNewMessage);
// //     socket.on('group:message:receive', handleGroupMessage);
// //     socket.on('typing:user', handleTyping);
// //     socket.on('group:typing:user', handleGroupTyping);

// //     return () => {
// //       socket.off('message:receive', handleNewMessage);
// //       socket.off('group:message:receive', handleGroupMessage);
// //       socket.off('typing:user', handleTyping);
// //       socket.off('group:typing:user', handleGroupTyping);
// //     };
// //   }, [socket, selectedContact, user]);

// //   const loadMessages = async () => {
// //     if (!selectedContact || !user) return;

// //     setLoading(true);
// //     try {
// //       let response;
// //       if (isGroup) {
// //         response = await messageAPI.getGroupMessages(selectedContact._id);
// //       } else {
// //         response = await messageAPI.getMessages(user.id, selectedContact._id || selectedContact.id);
// //       }

// //       if (response.data.success) {
// //         setMessages(response.data.messages);
// //       }
// //     } catch (error) {
// //       console.error('Error loading messages:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSendMessage = (content, replyToId = null) => {
// //     if (!selectedContact || !user) return;

// //     const messageData = {
// //       sender: user.id,
// //       content,
// //       messageType: 'text',
// //       replyTo: replyToId,
// //     };

// //     if (isGroup) {
// //       messageData.group = selectedContact._id;
// //       sendGroupMessage(messageData);
// //     } else {
// //       messageData.recipient = selectedContact._id || selectedContact.id;
// //       sendMessage(messageData);
// //     }

// //     setReplyTo(null);
// //   };

// //   const handleTyping = (isTyping) => {
// //     if (isGroup) {
// //       if (isTyping) {
// //         startGroupTyping(selectedContact._id);
// //       } else {
// //         stopGroupTyping(selectedContact._id);
// //       }
// //     } else {
// //       if (isTyping) {
// //         startTyping(selectedContact._id || selectedContact.id);
// //       } else {
// //         stopTyping(selectedContact._id || selectedContact.id);
// //       }
// //     }
// //   };

// //   // Empty state
// //   if (!selectedContact) {
// //     return (
// //       <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-8">
// //         <div className="text-center max-w-md">
// //           {/* Animated Icon */}
// //           <div className="relative mb-8">
// //             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
// //             <div className="relative bg-white rounded-full p-8 shadow-2xl">
// //               <MessageSquare className="w-24 h-24 text-purple-600" strokeWidth={1.5} />
// //             </div>
// //           </div>

// //           <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2">
// //             Welcome to ChatApp
// //             <Sparkles className="w-6 h-6 text-yellow-500" />
// //           </h3>
// //           <p className="text-gray-600 mb-8 text-base sm:text-lg">
// //             Select a chat to start messaging or create a new conversation
// //           </p>

// //           {/* Feature Pills */}
// //           <div className="flex flex-wrap gap-3 justify-center">
// //             <div className="px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-700 flex items-center gap-2">
// //               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
// //               Real-time Chat
// //             </div>
// //             <div className="px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-700 flex items-center gap-2">
// //               <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
// //               Group Messaging
// //             </div>
// //             <div className="px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-gray-700 flex items-center gap-2">
// //               <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
// //               End-to-End Encrypted
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex-1 flex flex-col bg-white">
// //       <ChatHeader 
// //         contact={selectedContact} 
// //         isGroup={isGroup}
// //         memberCount={selectedContact.members?.length || 0}
// //         onBack={onBack}
// //       />

// //       {loading ? (
// //         <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
// //           <div className="text-center">
// //             <Loader size="lg" />
// //             <p className="mt-4 text-gray-600 font-medium">Loading messages...</p>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           <MessageList messages={messages} typingUser={typingUser} />
// //           <MessageInput
// //             onSend={handleSendMessage}
// //             onTyping={handleTyping}
// //             replyTo={replyTo}
// //             onCancelReply={() => setReplyTo(null)}
// //           />
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatWindow;
// import { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useSocket } from '../../context/SocketContext';
// import { messageAPI } from '../../services/api';
// import ChatHeader from './ChatHeader';
// import MessageList from './MessageList';
// import MessageInput from './MessageInput';
// import Loader from '../common/Loader';
// import { MessageSquare, Sparkles } from 'lucide-react';

// const ChatWindow = ({ selectedContact, isGroup = false, onBack }) => {
//   const { user } = useAuth();
//   const { socket, sendMessage, sendGroupMessage, joinConversation, joinGroup, startTyping, stopTyping, startGroupTyping, stopGroupTyping } = useSocket();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [replyTo, setReplyTo] = useState(null);
//   const [typingUser, setTypingUser] = useState(null);

//   useEffect(() => {
//     if (selectedContact) {
//       loadMessages();
      
//       if (isGroup) {
//         joinGroup(selectedContact._id);
//       } else {
//         joinConversation(selectedContact._id || selectedContact.id);
//       }
//     }
//   }, [selectedContact]);

//   useEffect(() => {
//     if (!socket) return;

//     const handleNewMessage = (message) => {
//       setMessages(prev => [...prev, message]);
//     };

//     const handleGroupMessage = (message) => {
//       setMessages(prev => [...prev, message]);
//     };

//     const handleTyping = ({ userId, isTyping }) => {
//       if (isTyping && selectedContact && (userId === selectedContact._id || userId === selectedContact.id)) {
//         setTypingUser(selectedContact);
//       } else {
//         setTypingUser(null);
//       }
//     };

//     const handleGroupTyping = ({ userId, username, isTyping }) => {
//       if (isTyping && userId !== user.id) {
//         setTypingUser({ username });
//       } else {
//         setTypingUser(null);
//       }
//     };

//     socket.on('message:receive', handleNewMessage);
//     socket.on('group:message:receive', handleGroupMessage);
//     socket.on('typing:user', handleTyping);
//     socket.on('group:typing:user', handleGroupTyping);

//     return () => {
//       socket.off('message:receive', handleNewMessage);
//       socket.off('group:message:receive', handleGroupMessage);
//       socket.off('typing:user', handleTyping);
//       socket.off('group:typing:user', handleGroupTyping);
//     };
//   }, [socket, selectedContact, user]);

//   const loadMessages = async () => {
//     if (!selectedContact || !user) return;

//     setLoading(true);
//     try {
//       let response;
//       if (isGroup) {
//         response = await messageAPI.getGroupMessages(selectedContact._id);
//       } else {
//         response = await messageAPI.getMessages(user.id, selectedContact._id || selectedContact.id);
//       }

//       if (response.data.success) {
//         setMessages(response.data.messages);
//       }
//     } catch (error) {
//       console.error('Error loading messages:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendMessage = (content, replyToId = null) => {
//     if (!selectedContact || !user) return;

//     const messageData = {
//       sender: user.id,
//       content,
//       messageType: 'text',
//       replyTo: replyToId,
//     };

//     if (isGroup) {
//       messageData.group = selectedContact._id;
//       sendGroupMessage(messageData);
//     } else {
//       messageData.recipient = selectedContact._id || selectedContact.id;
//       sendMessage(messageData);
//     }

//     setReplyTo(null);
//   };

//   const handleTyping = (isTyping) => {
//     if (isGroup) {
//       if (isTyping) {
//         startGroupTyping(selectedContact._id);
//       } else {
//         stopGroupTyping(selectedContact._id);
//       }
//     } else {
//       if (isTyping) {
//         startTyping(selectedContact._id || selectedContact.id);
//       } else {
//         stopTyping(selectedContact._id || selectedContact.id);
//       }
//     }
//   };

//   // Empty state
//   if (!selectedContact) {
//     return (
//       <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
//         <div className="text-center max-w-md">
//           {/* Animated Icon */}
//           <div className="relative mb-6 sm:mb-8">
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
//             <div className="relative bg-white rounded-full p-6 sm:p-8 shadow-2xl">
//               <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-purple-600" strokeWidth={1.5} />
//             </div>
//           </div>

//           <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 flex items-center justify-center gap-2">
//             Welcome to ChatApp
//             <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
//           </h3>
//           <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
//             Select a chat to start messaging or create a new conversation
//           </p>

//           {/* Feature Pills */}
//           <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
//             <div className="px-3 sm:px-4 py-2 bg-white rounded-full shadow-md text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
//               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//               Real-time Chat
//             </div>
//             <div className="px-3 sm:px-4 py-2 bg-white rounded-full shadow-md text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
//               <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
//               Group Messaging
//             </div>
//             <div className="px-3 sm:px-4 py-2 bg-white rounded-full shadow-md text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
//               <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
//               Encrypted
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col bg-white h-screen overflow-hidden">
//       <ChatHeader 
//         contact={selectedContact} 
//         isGroup={isGroup}
//         memberCount={selectedContact.members?.length || 0}
//         onBack={onBack}
//       />

//       {loading ? (
//         <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
//           <div className="text-center">
//             <Loader size="lg" />
//             <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base">Loading messages...</p>
//           </div>
//         </div>
//       ) : (
//         <>
//           <MessageList messages={messages} typingUser={typingUser} />
//           <MessageInput
//             onSend={handleSendMessage}
//             onTyping={handleTyping}
//             replyTo={replyTo}
//             onCancelReply={() => setReplyTo(null)}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { messageAPI } from '../../services/api';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Loader from '../common/Loader';
import { MessageSquare, Sparkles, Send, Users as UsersIcon, Shield } from 'lucide-react';

const ChatWindow = ({ selectedContact, isGroup = false, onBack }) => {
  const { user } = useAuth();
  const { socket, sendMessage, sendGroupMessage, joinConversation, joinGroup, startTyping, stopTyping, startGroupTyping, stopGroupTyping } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (selectedContact) {
      loadMessages();
      
      if (isGroup) {
        joinGroup(selectedContact._id);
      } else {
        joinConversation(selectedContact._id || selectedContact.id);
      }
    }
  }, [selectedContact]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    const handleGroupMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    const handleTyping = ({ userId, isTyping }) => {
      if (isTyping && selectedContact && (userId === selectedContact._id || userId === selectedContact.id)) {
        setTypingUser(selectedContact);
      } else {
        setTypingUser(null);
      }
    };

    const handleGroupTyping = ({ userId, username, isTyping }) => {
      if (isTyping && userId !== user.id) {
        setTypingUser({ username });
      } else {
        setTypingUser(null);
      }
    };

    socket.on('message:receive', handleNewMessage);
    socket.on('group:message:receive', handleGroupMessage);
    socket.on('typing:user', handleTyping);
    socket.on('group:typing:user', handleGroupTyping);

    return () => {
      socket.off('message:receive', handleNewMessage);
      socket.off('group:message:receive', handleGroupMessage);
      socket.off('typing:user', handleTyping);
      socket.off('group:typing:user', handleGroupTyping);
    };
  }, [socket, selectedContact, user]);

 const loadMessages = async () => {
  if (!selectedContact || !user) return;

  setLoading(true);
  try {
    let response;
    if (isGroup) {
      response = await messageAPI.getGroupMessages(selectedContact._id);
    } else {
      response = await messageAPI.getMessages(selectedContact._id || selectedContact.id);
    }

    if (response.data.success) {
      setMessages(response.data.messages);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
  } finally {
    setLoading(false);
  }
};


  const handleSendMessage = (content, replyToId = null) => {
    if (!selectedContact || !user) return;

    const messageData = {
      sender: user.id,
      content,
      messageType: 'text',
      replyTo: replyToId,
    };

    if (isGroup) {
      messageData.group = selectedContact._id;
      sendGroupMessage(messageData);
    } else {
      messageData.recipient = selectedContact._id || selectedContact.id;
      sendMessage(messageData);
    }

    setReplyTo(null);
  };

  const handleTyping = (isTyping) => {
    if (isGroup) {
      if (isTyping) {
        startGroupTyping(selectedContact._id);
      } else {
        stopGroupTyping(selectedContact._id);
      }
    } else {
      if (isTyping) {
        startTyping(selectedContact._id || selectedContact.id);
      } else {
        stopTyping(selectedContact._id || selectedContact.id);
      }
    }
  };

  // Empty state
  if (!selectedContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative text-center max-w-md z-10">
          {/* Animated Icon */}
          <div className="relative mb-6 sm:mb-8 inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 sm:p-8 shadow-2xl border-4 border-purple-100">
              <MessageSquare className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-purple-600" strokeWidth={1.5} />
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 flex items-center justify-center gap-2">
            Welcome to ChatApp
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 animate-pulse" />
          </h3>
          <p className="text-gray-600 mb-8 sm:mb-10 text-sm sm:text-base lg:text-lg font-medium">
            Select a chat to start messaging or create a new conversation
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1 text-sm">Real-time Chat</h4>
              <p className="text-xs text-gray-600">Instant messaging</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1 text-sm">Group Chat</h4>
              <p className="text-xs text-gray-600">Connect with many</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-1 text-sm">Secure</h4>
              <p className="text-xs text-gray-600">End-to-end encrypted</p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }

          .animate-blob {
            animation: blob 7s infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-screen overflow-hidden">
      <ChatHeader 
  contact={selectedContact} 
  isGroup={isGroup}
  memberCount={selectedContact.members?.length || 0}
  onBack={onBack}
 onGroupDeleted={onBack}  //  Just use onBack
  onGroupLeft={onBack}     // Just use onBack

/>


      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="text-center">
            <Loader size="lg" />
            <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base">Loading messages...</p>
          </div>
        </div>
      ) : (
        <>
          <MessageList messages={messages} typingUser={typingUser} />
          <MessageInput
            onSend={handleSendMessage}
            onTyping={handleTyping}
            replyTo={replyTo}
            onCancelReply={() => setReplyTo(null)}
          />
        </>
      )}
    </div>
  );
};

export default ChatWindow;

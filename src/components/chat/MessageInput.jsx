// // // // // // import { useState, useRef } from 'react';
// // // // // // import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';

// // // // // // const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
// // // // // //   const [message, setMessage] = useState('');
// // // // // //   const [isTyping, setIsTyping] = useState(false);
// // // // // //   const typingTimeoutRef = useRef(null);

// // // // // //   const handleChange = (e) => {
// // // // // //     setMessage(e.target.value);

// // // // // //     if (!isTyping) {
// // // // // //       setIsTyping(true);
// // // // // //       onTyping?.(true);
// // // // // //     }

// // // // // //     if (typingTimeoutRef.current) {
// // // // // //       clearTimeout(typingTimeoutRef.current);
// // // // // //     }

// // // // // //     typingTimeoutRef.current = setTimeout(() => {
// // // // // //       setIsTyping(false);
// // // // // //       onTyping?.(false);
// // // // // //     }, 1000);
// // // // // //   };

// // // // // //   const handleSubmit = (e) => {
// // // // // //     e.preventDefault();
    
// // // // // //     if (message.trim()) {
// // // // // //       onSend(message.trim(), replyTo?._id);
// // // // // //       setMessage('');
// // // // // //       setIsTyping(false);
// // // // // //       onTyping?.(false);
      
// // // // // //       if (typingTimeoutRef.current) {
// // // // // //         clearTimeout(typingTimeoutRef.current);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleKeyPress = (e) => {
// // // // // //     if (e.key === 'Enter' && !e.shiftKey) {
// // // // // //       e.preventDefault();
// // // // // //       handleSubmit(e);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
// // // // // //       {/* Reply Preview */}
// // // // // //       {replyTo && (
// // // // // //         <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border border-purple-200">
// // // // // //           <div className="flex-1 min-w-0">
// // // // // //             <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1">
// // // // // //               <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
// // // // // //               Replying to {replyTo.sender?.username}
// // // // // //             </p>
// // // // // //             <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
// // // // // //           </div>
// // // // // //           <button
// // // // // //             onClick={onCancelReply}
// // // // // //             className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2"
// // // // // //           >
// // // // // //             <X className="w-4 h-4" />
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
// // // // // //         {/* Emoji Button */}
// // // // // //         <button
// // // // // //           type="button"
// // // // // //           className="hidden sm:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg transition-all transform hover:scale-110"
// // // // // //           title="Emoji"
// // // // // //         >
// // // // // //           <Smile className="w-6 h-6" />
// // // // // //         </button>

// // // // // //         {/* Message Input Container */}
// // // // // //         <div className="flex-1 relative">
// // // // // //           <textarea
// // // // // //             value={message}
// // // // // //             onChange={handleChange}
// // // // // //             onKeyPress={handleKeyPress}
// // // // // //             placeholder="Type a message..."
// // // // // //             rows="1"
// // // // // //             className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 resize-none max-h-32 transition-all shadow-sm hover:border-gray-300"
// // // // // //             style={{ minHeight: '48px' }}
// // // // // //           />
          
// // // // // //           {/* Character count (optional) */}
// // // // // //           {message.length > 0 && (
// // // // // //             <span className="absolute bottom-2 right-3 text-xs text-gray-400">
// // // // // //               {message.length}
// // // // // //             </span>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Action Buttons */}
// // // // // //         <div className="flex items-center gap-1 sm:gap-2">
// // // // // //           {/* Attachment Button */}
// // // // // //           <button
// // // // // //             type="button"
// // // // // //             className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-all transform hover:scale-110"
// // // // // //             title="Attach file"
// // // // // //           >
// // // // // //             <Paperclip className="w-5 h-5 sm:w-6 sm:h-6" />
// // // // // //           </button>

// // // // // //           {/* Image Button (Mobile) */}
// // // // // //           <button
// // // // // //             type="button"
// // // // // //             className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all transform hover:scale-110"
// // // // // //             title="Send image"
// // // // // //           >
// // // // // //             <Image className="w-5 h-5" />
// // // // // //           </button>

// // // // // //           {/* Send Button or Voice */}
// // // // // //           {message.trim() ? (
// // // // // //             <button
// // // // // //               type="submit"
// // // // // //               disabled={!message.trim()}
// // // // // //               className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
// // // // // //             >
// // // // // //               <Send className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           ) : (
// // // // // //             <button
// // // // // //               type="button"
// // // // // //               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110"
// // // // // //               title="Voice message"
// // // // // //             >
// // // // // //               <Mic className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MessageInput;
// // // // // // import { useState, useRef } from 'react';
// // // // // // import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';

// // // // // // const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
// // // // // //   const [message, setMessage] = useState('');
// // // // // //   const [isTyping, setIsTyping] = useState(false);
// // // // // //   const typingTimeoutRef = useRef(null);
// // // // // //   const textareaRef = useRef(null);

// // // // // //   const handleChange = (e) => {
// // // // // //     setMessage(e.target.value);

// // // // // //     // Auto-resize textarea
// // // // // //     if (textareaRef.current) {
// // // // // //       textareaRef.current.style.height = 'auto';
// // // // // //       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
// // // // // //     }

// // // // // //     if (!isTyping) {
// // // // // //       setIsTyping(true);
// // // // // //       onTyping?.(true);
// // // // // //     }

// // // // // //     if (typingTimeoutRef.current) {
// // // // // //       clearTimeout(typingTimeoutRef.current);
// // // // // //     }

// // // // // //     typingTimeoutRef.current = setTimeout(() => {
// // // // // //       setIsTyping(false);
// // // // // //       onTyping?.(false);
// // // // // //     }, 1000);
// // // // // //   };

// // // // // //   const handleSubmit = (e) => {
// // // // // //     e.preventDefault();
    
// // // // // //     if (message.trim()) {
// // // // // //       onSend(message.trim(), replyTo?._id);
// // // // // //       setMessage('');
// // // // // //       setIsTyping(false);
// // // // // //       onTyping?.(false);
      
// // // // // //       // Reset textarea height
// // // // // //       if (textareaRef.current) {
// // // // // //         textareaRef.current.style.height = 'auto';
// // // // // //       }
      
// // // // // //       if (typingTimeoutRef.current) {
// // // // // //         clearTimeout(typingTimeoutRef.current);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleKeyPress = (e) => {
// // // // // //     if (e.key === 'Enter' && !e.shiftKey) {
// // // // // //       e.preventDefault();
// // // // // //       handleSubmit(e);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="bg-white border-t border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0">
// // // // // //       {/* Reply Preview */}
// // // // // //       {replyTo && (
// // // // // //         <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border border-purple-200">
// // // // // //           <div className="flex-1 min-w-0">
// // // // // //             <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1">
// // // // // //               <span className="w-1 h-4 bg-purple-600 rounded-full"></span>
// // // // // //               Replying to {replyTo.sender?.username}
// // // // // //             </p>
// // // // // //             <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
// // // // // //           </div>
// // // // // //           <button
// // // // // //             onClick={onCancelReply}
// // // // // //             className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0"
// // // // // //             aria-label="Cancel reply"
// // // // // //           >
// // // // // //             <X className="w-4 h-4" />
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
// // // // // //         {/* Emoji Button (Desktop) */}
// // // // // //         <button
// // // // // //           type="button"
// // // // // //           className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95 flex-shrink-0"
// // // // // //           title="Emoji"
// // // // // //         >
// // // // // //           <Smile className="w-6 h-6" />
// // // // // //         </button>

// // // // // //         {/* Message Input Container */}
// // // // // //         <div className="flex-1 relative min-w-0">
// // // // // //           <textarea
// // // // // //             ref={textareaRef}
// // // // // //             value={message}
// // // // // //             onChange={handleChange}
// // // // // //             onKeyPress={handleKeyPress}
// // // // // //             placeholder="Type a message..."
// // // // // //             rows="1"
// // // // // //             className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-gray-300 text-sm sm:text-base"
// // // // // //             style={{ minHeight: '44px', maxHeight: '120px' }}
// // // // // //           />
          
// // // // // //           {/* Character count */}
// // // // // //           {message.length > 100 && (
// // // // // //             <span className={`absolute bottom-2 right-3 text-xs ${message.length > 500 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
// // // // // //               {message.length}
// // // // // //             </span>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Action Buttons */}
// // // // // //         <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
// // // // // //           {/* Attachment Button */}
// // // // // //           <button
// // // // // //             type="button"
// // // // // //             className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
// // // // // //             title="Attach file"
// // // // // //           >
// // // // // //             <Paperclip className="w-5 h-5" />
// // // // // //           </button>

// // // // // //           {/* Image Button (Mobile) */}
// // // // // //           <button
// // // // // //             type="button"
// // // // // //             className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
// // // // // //             title="Send image"
// // // // // //           >
// // // // // //             <Image className="w-5 h-5" />
// // // // // //           </button>

// // // // // //           {/* Send Button or Voice */}
// // // // // //           {message.trim() ? (
// // // // // //             <button
// // // // // //               type="submit"
// // // // // //               disabled={!message.trim()}
// // // // // //               className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
// // // // // //               aria-label="Send message"
// // // // // //             >
// // // // // //               <Send className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           ) : (
// // // // // //             <button
// // // // // //               type="button"
// // // // // //               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95"
// // // // // //               title="Voice message"
// // // // // //             >
// // // // // //               <Mic className="w-5 h-5" />
// // // // // //             </button>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </form>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default MessageInput;
// // // // // import { useState, useRef } from 'react';
// // // // // import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';
// // // // // import Toast from '../common/Toast';

// // // // // const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
// // // // //   const [message, setMessage] = useState('');
// // // // //   const [isTyping, setIsTyping] = useState(false);
// // // // //   const [showToast, setShowToast] = useState(false);
// // // // //   const [toastMessage, setToastMessage] = useState('');
// // // // //   const typingTimeoutRef = useRef(null);
// // // // //   const textareaRef = useRef(null);

// // // // //   const handleFeatureClick = (featureName) => {
// // // // //     setToastMessage(`${featureName} - Coming Soon! 🚀`);
// // // // //     setShowToast(true);
// // // // //   };

// // // // //   const handleChange = (e) => {
// // // // //     setMessage(e.target.value);

// // // // //     // Auto-resize textarea
// // // // //     if (textareaRef.current) {
// // // // //       textareaRef.current.style.height = 'auto';
// // // // //       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
// // // // //     }

// // // // //     if (!isTyping) {
// // // // //       setIsTyping(true);
// // // // //       onTyping?.(true);
// // // // //     }

// // // // //     if (typingTimeoutRef.current) {
// // // // //       clearTimeout(typingTimeoutRef.current);
// // // // //     }

// // // // //     typingTimeoutRef.current = setTimeout(() => {
// // // // //       setIsTyping(false);
// // // // //       onTyping?.(false);
// // // // //     }, 1000);
// // // // //   };

// // // // //   const handleSubmit = (e) => {
// // // // //     e.preventDefault();
    
// // // // //     if (message.trim()) {
// // // // //       onSend(message.trim(), replyTo?._id);
// // // // //       setMessage('');
// // // // //       setIsTyping(false);
// // // // //       onTyping?.(false);
      
// // // // //       // Reset textarea height
// // // // //       if (textareaRef.current) {
// // // // //         textareaRef.current.style.height = 'auto';
// // // // //       }
      
// // // // //       if (typingTimeoutRef.current) {
// // // // //         clearTimeout(typingTimeoutRef.current);
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleKeyPress = (e) => {
// // // // //     if (e.key === 'Enter' && !e.shiftKey) {
// // // // //       e.preventDefault();
// // // // //       handleSubmit(e);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       {showToast && (
// // // // //         <Toast
// // // // //           message={toastMessage}
// // // // //           type="feature"
// // // // //           onClose={() => setShowToast(false)}
// // // // //           duration={3000}
// // // // //         />
// // // // //       )}

// // // // //       <div className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t-2 border-purple-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0 shadow-lg">
// // // // //         {/* Reply Preview */}
// // // // //         {replyTo && (
// // // // //           <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border-l-4 border-purple-500 shadow-md">
// // // // //             <div className="flex-1 min-w-0">
// // // // //               <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1.5">
// // // // //                 <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
// // // // //                 Replying to {replyTo.sender?.username}
// // // // //               </p>
// // // // //               <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
// // // // //             </div>
// // // // //             <button
// // // // //               onClick={onCancelReply}
// // // // //               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0 transform hover:scale-110 active:scale-95"
// // // // //               aria-label="Cancel reply"
// // // // //             >
// // // // //               <X className="w-4 h-4" />
// // // // //             </button>
// // // // //           </div>
// // // // //         )}

// // // // //         <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
// // // // //           {/* Emoji Button (Desktop) */}
// // // // //           <button
// // // // //             type="button"
// // // // //             onClick={() => handleFeatureClick('Emoji Picker')}
// // // // //             className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-sm hover:shadow-md"
// // // // //             title="Emoji"
// // // // //           >
// // // // //             <Smile className="w-6 h-6" />
// // // // //           </button>

// // // // //           {/* Message Input Container */}
// // // // //           <div className="flex-1 relative min-w-0">
// // // // //             <textarea
// // // // //               ref={textareaRef}
// // // // //               value={message}
// // // // //               onChange={handleChange}
// // // // //               onKeyPress={handleKeyPress}
// // // // //               placeholder="Type a message..."
// // // // //               rows="1"
// // // // //               className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-purple-300 text-sm sm:text-base bg-white"
// // // // //               style={{ minHeight: '44px', maxHeight: '120px' }}
// // // // //             />
            
// // // // //             {/* Character count */}
// // // // //             {message.length > 100 && (
// // // // //               <span className={`absolute bottom-2 right-3 text-xs font-semibold ${message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
// // // // //                 {message.length}
// // // // //               </span>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* Action Buttons */}
// // // // //           <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
// // // // //             {/* Attachment Button */}
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => handleFeatureClick('File Attachment')}
// // // // //               className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // // // //               title="Attach file"
// // // // //             >
// // // // //               <Paperclip className="w-5 h-5" />
// // // // //             </button>

// // // // //             {/* Image Button (Mobile) */}
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => handleFeatureClick('Image Upload')}
// // // // //               className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // // // //               title="Send image"
// // // // //             >
// // // // //               <Image className="w-5 h-5" />
// // // // //             </button>

// // // // //             {/* Send Button or Voice */}
// // // // //             {message.trim() ? (
// // // // //               <button
// // // // //                 type="submit"
// // // // //                 disabled={!message.trim()}
// // // // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
// // // // //                 aria-label="Send message"
// // // // //               >
// // // // //                 <Send className="w-5 h-5" />
// // // // //               </button>
// // // // //             ) : (
// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() => handleFeatureClick('Voice Message')}
// // // // //                 className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // // // //                 title="Voice message"
// // // // //               >
// // // // //                 <Mic className="w-5 h-5" />
// // // // //               </button>
// // // // //             )}
// // // // //           </div>
// // // // //         </form>
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default MessageInput;
// // // // import { useState, useRef, useEffect } from 'react';
// // // // import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';
// // // // import Toast from '../common/Toast';

// // // // const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
// // // //   const [message, setMessage] = useState('');
// // // //   const [isTyping, setIsTyping] = useState(false);
// // // //   const [showToast, setShowToast] = useState(false);
// // // //   const [toastMessage, setToastMessage] = useState('');
// // // //   const typingTimeoutRef = useRef(null);
// // // //   const textareaRef = useRef(null);
// // // //   const containerRef = useRef(null);

// // // //   // Scroll input into view when keyboard appears
// // // //   useEffect(() => {
// // // //     const handleFocus = () => {
// // // //       setTimeout(() => {
// // // //         if (textareaRef.current) {
// // // //           textareaRef.current.scrollIntoView({ 
// // // //             behavior: 'smooth', 
// // // //             block: 'nearest',
// // // //             inline: 'nearest'
// // // //           });
// // // //         }
// // // //       }, 300); // Delay to allow keyboard animation
// // // //     };

// // // //     const textarea = textareaRef.current;
// // // //     if (textarea) {
// // // //       textarea.addEventListener('focus', handleFocus);
// // // //       return () => textarea.removeEventListener('focus', handleFocus);
// // // //     }
// // // //   }, []);

// // // //   const handleFeatureClick = (featureName) => {
// // // //     setToastMessage(`${featureName} - Coming Soon! 🚀`);
// // // //     setShowToast(true);
// // // //   };

// // // //   const handleChange = (e) => {
// // // //     setMessage(e.target.value);

// // // //     // Auto-resize textarea
// // // //     if (textareaRef.current) {
// // // //       textareaRef.current.style.height = 'auto';
// // // //       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
// // // //     }

// // // //     if (!isTyping) {
// // // //       setIsTyping(true);
// // // //       onTyping?.(true);
// // // //     }

// // // //     if (typingTimeoutRef.current) {
// // // //       clearTimeout(typingTimeoutRef.current);
// // // //     }

// // // //     typingTimeoutRef.current = setTimeout(() => {
// // // //       setIsTyping(false);
// // // //       onTyping?.(false);
// // // //     }, 1000);
// // // //   };

// // // //   const handleSubmit = (e) => {
// // // //     e.preventDefault();
    
// // // //     if (message.trim()) {
// // // //       onSend(message.trim(), replyTo?._id);
// // // //       setMessage('');
// // // //       setIsTyping(false);
// // // //       onTyping?.(false);
      
// // // //       // Reset textarea height
// // // //       if (textareaRef.current) {
// // // //         textareaRef.current.style.height = 'auto';
// // // //       }
      
// // // //       if (typingTimeoutRef.current) {
// // // //         clearTimeout(typingTimeoutRef.current);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleKeyPress = (e) => {
// // // //     if (e.key === 'Enter' && !e.shiftKey) {
// // // //       e.preventDefault();
// // // //       handleSubmit(e);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {showToast && (
// // // //         <Toast
// // // //           message={toastMessage}
// // // //           type="feature"
// // // //           onClose={() => setShowToast(false)}
// // // //           duration={3000}
// // // //         />
// // // //       )}

// // // //       <div 
// // // //         ref={containerRef}
// // // //         className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t-2 border-purple-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0 shadow-lg safe-area-bottom"
// // // //       >
// // // //         {/* Reply Preview */}
// // // //         {replyTo && (
// // // //           <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border-l-4 border-purple-500 shadow-md">
// // // //             <div className="flex-1 min-w-0">
// // // //               <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1.5">
// // // //                 <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
// // // //                 Replying to {replyTo.sender?.username}
// // // //               </p>
// // // //               <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
// // // //             </div>
// // // //             <button
// // // //               onClick={onCancelReply}
// // // //               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0 transform hover:scale-110 active:scale-95"
// // // //               aria-label="Cancel reply"
// // // //             >
// // // //               <X className="w-4 h-4" />
// // // //             </button>
// // // //           </div>
// // // //         )}

// // // //         <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
// // // //           {/* Emoji Button (Desktop) */}
// // // //           <button
// // // //             type="button"
// // // //             onClick={() => handleFeatureClick('Emoji Picker')}
// // // //             className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-sm hover:shadow-md"
// // // //             title="Emoji"
// // // //           >
// // // //             <Smile className="w-6 h-6" />
// // // //           </button>

// // // //           {/* Message Input Container */}
// // // //           <div className="flex-1 relative min-w-0">
// // // //             <textarea
// // // //               ref={textareaRef}
// // // //               value={message}
// // // //               onChange={handleChange}
// // // //               onKeyPress={handleKeyPress}
// // // //               placeholder="Type a message..."
// // // //               rows="1"
// // // //               className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-purple-300 text-sm sm:text-base bg-white"
// // // //               style={{ minHeight: '44px', maxHeight: '120px' }}
// // // //             />
            
// // // //             {/* Character count */}
// // // //             {message.length > 100 && (
// // // //               <span className={`absolute bottom-2 right-3 text-xs font-semibold ${message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
// // // //                 {message.length}
// // // //               </span>
// // // //             )}
// // // //           </div>

// // // //           {/* Action Buttons */}
// // // //           <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
// // // //             {/* Attachment Button */}
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => handleFeatureClick('File Attachment')}
// // // //               className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // // //               title="Attach file"
// // // //             >
// // // //               <Paperclip className="w-5 h-5" />
// // // //             </button>

// // // //             {/* Image Button (Mobile) */}
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => handleFeatureClick('Image Upload')}
// // // //               className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // // //               title="Send image"
// // // //             >
// // // //               <Image className="w-5 h-5" />
// // // //             </button>

// // // //             {/* Send Button or Voice */}
// // // //             {message.trim() ? (
// // // //               <button
// // // //                 type="submit"
// // // //                 disabled={!message.trim()}
// // // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
// // // //                 aria-label="Send message"
// // // //               >
// // // //                 <Send className="w-5 h-5" />
// // // //               </button>
// // // //             ) : (
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => handleFeatureClick('Voice Message')}
// // // //                 className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // // //                 title="Voice message"
// // // //               >
// // // //                 <Mic className="w-5 h-5" />
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default MessageInput;
// // // import { useState, useRef, useEffect } from 'react';
// // // import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';
// // // import Toast from '../common/Toast';

// // // const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
// // //   const [message, setMessage] = useState('');
// // //   const [isTyping, setIsTyping] = useState(false);
// // //   const [showToast, setShowToast] = useState(false);
// // //   const [toastMessage, setToastMessage] = useState('');
// // //   const typingTimeoutRef = useRef(null);
// // //   const textareaRef = useRef(null);
// // //   const containerRef = useRef(null);

// // //   // Scroll input into view when keyboard appears
// // //   useEffect(() => {
// // //     const handleFocus = () => {
// // //       setTimeout(() => {
// // //         if (containerRef.current) {
// // //           containerRef.current.scrollIntoView({ 
// // //             behavior: 'smooth', 
// // //             block: 'end',
// // //             inline: 'nearest'
// // //           });
// // //         }
// // //       }, 300);
// // //     };

// // //     const textarea = textareaRef.current;
// // //     if (textarea) {
// // //       textarea.addEventListener('focus', handleFocus);
// // //       return () => textarea.removeEventListener('focus', handleFocus);
// // //     }
// // //   }, []);

// // //   const handleFeatureClick = (featureName) => {
// // //     setToastMessage(`${featureName} - Coming Soon! 🚀`);
// // //     setShowToast(true);
// // //   };

// // //   const handleChange = (e) => {
// // //     setMessage(e.target.value);

// // //     // Auto-resize textarea
// // //     if (textareaRef.current) {
// // //       textareaRef.current.style.height = 'auto';
// // //       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
// // //     }

// // //     if (!isTyping) {
// // //       setIsTyping(true);
// // //       onTyping?.(true);
// // //     }

// // //     if (typingTimeoutRef.current) {
// // //       clearTimeout(typingTimeoutRef.current);
// // //     }

// // //     typingTimeoutRef.current = setTimeout(() => {
// // //       setIsTyping(false);
// // //       onTyping?.(false);
// // //     }, 1000);
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
    
// // //     if (message.trim()) {
// // //       onSend(message.trim(), replyTo?._id);
// // //       setMessage('');
// // //       setIsTyping(false);
// // //       onTyping?.(false);
      
// // //       // Reset textarea height
// // //       if (textareaRef.current) {
// // //         textareaRef.current.style.height = 'auto';
// // //       }
      
// // //       if (typingTimeoutRef.current) {
// // //         clearTimeout(typingTimeoutRef.current);
// // //       }
// // //     }
// // //   };

// // //   const handleKeyPress = (e) => {
// // //     if (e.key === 'Enter' && !e.shiftKey) {
// // //       e.preventDefault();
// // //       handleSubmit(e);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {showToast && (
// // //         <Toast
// // //           message={toastMessage}
// // //           type="feature"
// // //           onClose={() => setShowToast(false)}
// // //           duration={3000}
// // //         />
// // //       )}

// // //       <div 
// // //         ref={containerRef}
// // //         className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t-2 border-purple-200 px-3 sm:px-4 lg:px-6 flex-shrink-0 shadow-lg"
// // //         style={{ 
// // //           paddingTop: '0.75rem',
// // //           paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))'
// // //         }}
// // //       >
// // //         {/* Reply Preview */}
// // //         {replyTo && (
// // //           <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border-l-4 border-purple-500 shadow-md">
// // //             <div className="flex-1 min-w-0">
// // //               <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1.5">
// // //                 <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
// // //                 Replying to {replyTo.sender?.username}
// // //               </p>
// // //               <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
// // //             </div>
// // //             <button
// // //               onClick={onCancelReply}
// // //               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0 transform hover:scale-110 active:scale-95"
// // //               aria-label="Cancel reply"
// // //             >
// // //               <X className="w-4 h-4" />
// // //             </button>
// // //           </div>
// // //         )}

// // //         <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
// // //           {/* Emoji Button (Desktop) */}
// // //           <button
// // //             type="button"
// // //             onClick={() => handleFeatureClick('Emoji Picker')}
// // //             className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-sm hover:shadow-md"
// // //             title="Emoji"
// // //           >
// // //             <Smile className="w-6 h-6" />
// // //           </button>

// // //           {/* Message Input Container */}
// // //           <div className="flex-1 relative min-w-0">
// // //             <textarea
// // //               ref={textareaRef}
// // //               value={message}
// // //               onChange={handleChange}
// // //               onKeyPress={handleKeyPress}
// // //               placeholder="Type a message..."
// // //               rows="1"
// // //               className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-purple-300 text-sm sm:text-base bg-white"
// // //               style={{ minHeight: '44px', maxHeight: '120px' }}
// // //             />
            
// // //             {/* Character count */}
// // //             {message.length > 100 && (
// // //               <span className={`absolute bottom-2 right-3 text-xs font-semibold ${message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
// // //                 {message.length}
// // //               </span>
// // //             )}
// // //           </div>

// // //           {/* Action Buttons */}
// // //           <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
// // //             {/* Attachment Button */}
// // //             <button
// // //               type="button"
// // //               onClick={() => handleFeatureClick('File Attachment')}
// // //               className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // //               title="Attach file"
// // //             >
// // //               <Paperclip className="w-5 h-5" />
// // //             </button>

// // //             {/* Image Button (Mobile) */}
// // //             <button
// // //               type="button"
// // //               onClick={() => handleFeatureClick('Image Upload')}
// // //               className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // //               title="Send image"
// // //             >
// // //               <Image className="w-5 h-5" />
// // //             </button>

// // //             {/* Send Button or Voice */}
// // //             {message.trim() ? (
// // //               <button
// // //                 type="submit"
// // //                 disabled={!message.trim()}
// // //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
// // //                 aria-label="Send message"
// // //               >
// // //                 <Send className="w-5 h-5" />
// // //               </button>
// // //             ) : (
// // //               <button
// // //                 type="button"
// // //                 onClick={() => handleFeatureClick('Voice Message')}
// // //                 className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// // //                 title="Voice message"
// // //               >
// // //                 <Mic className="w-5 h-5" />
// // //               </button>
// // //             )}
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default MessageInput;
// // import { useState, useRef, useEffect } from 'react';
// // import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';
// // import Toast from '../common/Toast';

// // const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
// //   const [message, setMessage] = useState('');
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [showToast, setShowToast] = useState(false);
// //   const [toastMessage, setToastMessage] = useState('');
// //   const typingTimeoutRef = useRef(null);
// //   const textareaRef = useRef(null);
// //   const containerRef = useRef(null);

// //   // Scroll input into view when keyboard appears
// //   useEffect(() => {
// //     const handleFocus = () => {
// //       // Delay to allow keyboard animation
// //       setTimeout(() => {
// //         if (textareaRef.current) {
// //           textareaRef.current.scrollIntoView({ 
// //             behavior: 'smooth', 
// //             block: 'nearest',
// //             inline: 'nearest'
// //           });
// //         }
// //       }, 300);
// //     };

// //     const handleResize = () => {
// //       // When keyboard opens/closes, ensure input is visible
// //       if (document.activeElement === textareaRef.current) {
// //         setTimeout(() => {
// //           if (textareaRef.current) {
// //             textareaRef.current.scrollIntoView({ 
// //               behavior: 'smooth', 
// //               block: 'nearest'
// //             });
// //           }
// //         }, 100);
// //       }
// //     };

// //     const textarea = textareaRef.current;
// //     if (textarea) {
// //       textarea.addEventListener('focus', handleFocus);
// //       window.addEventListener('resize', handleResize);
      
// //       return () => {
// //         textarea.removeEventListener('focus', handleFocus);
// //         window.removeEventListener('resize', handleResize);
// //       };
// //     }
// //   }, []);

// //   const handleFeatureClick = (featureName) => {
// //     setToastMessage(`${featureName} - Coming Soon! 🚀`);
// //     setShowToast(true);
// //   };

// //   const handleChange = (e) => {
// //     setMessage(e.target.value);

// //     // Auto-resize textarea
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = 'auto';
// //       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
// //     }

// //     if (!isTyping) {
// //       setIsTyping(true);
// //       onTyping?.(true);
// //     }

// //     if (typingTimeoutRef.current) {
// //       clearTimeout(typingTimeoutRef.current);
// //     }

// //     typingTimeoutRef.current = setTimeout(() => {
// //       setIsTyping(false);
// //       onTyping?.(false);
// //     }, 1000);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     if (message.trim()) {
// //       onSend(message.trim(), replyTo?._id);
// //       setMessage('');
// //       setIsTyping(false);
// //       onTyping?.(false);
      
// //       // Reset textarea height
// //       if (textareaRef.current) {
// //         textareaRef.current.style.height = 'auto';
// //       }
      
// //       if (typingTimeoutRef.current) {
// //         clearTimeout(typingTimeoutRef.current);
// //       }
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSubmit(e);
// //     }
// //   };

// //   return (
// //     <>
// //       {showToast && (
// //         <Toast
// //           message={toastMessage}
// //           type="feature"
// //           onClose={() => setShowToast(false)}
// //           duration={3000}
// //         />
// //       )}

// //       <div 
// //         ref={containerRef}
// //         className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t-2 border-purple-200 px-3 sm:px-4 lg:px-6 flex-shrink-0 shadow-lg"
// //         style={{ 
// //           paddingTop: '0.75rem',
// //           paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))'
// //         }}
// //       >
// //         {/* Reply Preview */}
// //         {replyTo && (
// //           <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border-l-4 border-purple-500 shadow-md">
// //             <div className="flex-1 min-w-0">
// //               <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1.5">
// //                 <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
// //                 Replying to {replyTo.sender?.username}
// //               </p>
// //               <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
// //             </div>
// //             <button
// //               onClick={onCancelReply}
// //               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0 transform hover:scale-110 active:scale-95"
// //               aria-label="Cancel reply"
// //             >
// //               <X className="w-4 h-4" />
// //             </button>
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
// //           {/* Emoji Button (Desktop) */}
// //           <button
// //             type="button"
// //             onClick={() => handleFeatureClick('Emoji Picker')}
// //             className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-sm hover:shadow-md"
// //             title="Emoji"
// //           >
// //             <Smile className="w-6 h-6" />
// //           </button>

// //           {/* Message Input Container */}
// //           <div className="flex-1 relative min-w-0">
// //             <textarea
// //               ref={textareaRef}
// //               value={message}
// //               onChange={handleChange}
// //               onKeyPress={handleKeyPress}
// //               placeholder="Type a message..."
// //               rows="1"
// //               className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-purple-300 text-sm sm:text-base bg-white"
// //               style={{ minHeight: '44px', maxHeight: '120px' }}
// //             />
            
// //             {/* Character count */}
// //             {message.length > 100 && (
// //               <span className={`absolute bottom-2 right-3 text-xs font-semibold ${message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
// //                 {message.length}
// //               </span>
// //             )}
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
// //             {/* Attachment Button */}
// //             <button
// //               type="button"
// //               onClick={() => handleFeatureClick('File Attachment')}
// //               className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// //               title="Attach file"
// //             >
// //               <Paperclip className="w-5 h-5" />
// //             </button>

// //             {/* Image Button (Mobile) */}
// //             <button
// //               type="button"
// //               onClick={() => handleFeatureClick('Image Upload')}
// //               className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// //               title="Send image"
// //             >
// //               <Image className="w-5 h-5" />
// //             </button>

// //             {/* Send Button or Voice */}
// //             {message.trim() ? (
// //               <button
// //                 type="submit"
// //                 disabled={!message.trim()}
// //                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
// //                 aria-label="Send message"
// //               >
// //                 <Send className="w-5 h-5" />
// //               </button>
// //             ) : (
// //               <button
// //                 type="button"
// //                 onClick={() => handleFeatureClick('Voice Message')}
// //                 className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
// //                 title="Voice message"
// //               >
// //                 <Mic className="w-5 h-5" />
// //               </button>
// //             )}
// //           </div>
// //         </form>
// //       </div>
// //     </>
// //   );
// // };

// // export default MessageInput;
// import { useState, useRef, useEffect } from 'react';
// import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';
// import Toast from '../common/Toast';

// const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
//   const [message, setMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const typingTimeoutRef = useRef(null);
//   const textareaRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleFocus = () => {
//       setTimeout(() => {
//         if (textareaRef.current) {
//           textareaRef.current.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'nearest',
//             inline: 'nearest'
//           });
//         }
//       }, 300);
//     };

//     const handleResize = () => {
//       if (document.activeElement === textareaRef.current) {
//         setTimeout(() => {
//           if (textareaRef.current) {
//             textareaRef.current.scrollIntoView({ 
//               behavior: 'smooth', 
//               block: 'nearest'
//             });
//           }
//         }, 100);
//       }
//     };

//     const textarea = textareaRef.current;
//     if (textarea) {
//       textarea.addEventListener('focus', handleFocus);
//       window.addEventListener('resize', handleResize);
      
//       return () => {
//         textarea.removeEventListener('focus', handleFocus);
//         window.removeEventListener('resize', handleResize);
//       };
//     }
//   }, []);

//   const handleFeatureClick = (featureName) => {
//     setToastMessage(`${featureName} - Coming Soon! 🚀`);
//     setShowToast(true);
//   };

//   const handleChange = (e) => {
//     setMessage(e.target.value);

//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
//     }

//     if (!isTyping) {
//       setIsTyping(true);
//       onTyping?.(true);
//     }

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     typingTimeoutRef.current = setTimeout(() => {
//       setIsTyping(false);
//       onTyping?.(false);
//     }, 1000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (message.trim()) {
//       onSend(message.trim(), replyTo?._id);
//       setMessage('');
//       setIsTyping(false);
//       onTyping?.(false);
      
//       if (textareaRef.current) {
//         textareaRef.current.style.height = 'auto';
//       }
      
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <>
//       {showToast && (
//         <Toast
//           message={toastMessage}
//           type="feature"
//           onClose={() => setShowToast(false)}
//           duration={3000}
//         />
//       )}

//       <div 
//         ref={containerRef}
//         className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t-2 border-purple-200 px-3 sm:px-4 lg:px-6 flex-shrink-0 shadow-lg"
//         style={{ 
//           paddingTop: '0.75rem',
//           paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
//           marginBottom: 'env(safe-area-inset-bottom, 0px)'
//         }}
//       >
//         {replyTo && (
//           <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border-l-4 border-purple-500 shadow-md">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1.5">
//                 <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
//                 Replying to {replyTo.sender?.username}
//               </p>
//               <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
//             </div>
//             <button
//               onClick={onCancelReply}
//               className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0 transform hover:scale-110 active:scale-95"
//               aria-label="Cancel reply"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
//           <button
//             type="button"
//             onClick={() => handleFeatureClick('Emoji Picker')}
//             className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-sm hover:shadow-md"
//             title="Emoji"
//           >
//             <Smile className="w-6 h-6" />
//           </button>

//           <div className="flex-1 relative min-w-0">
//             <textarea
//               ref={textareaRef}
//               value={message}
//               onChange={handleChange}
//               onKeyPress={handleKeyPress}
//               placeholder="Type a message..."
//               rows="1"
//               className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-purple-300 text-sm sm:text-base bg-white"
//               style={{ minHeight: '44px', maxHeight: '120px' }}
//             />
            
//             {message.length > 100 && (
//               <span className={`absolute bottom-2 right-3 text-xs font-semibold ${message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
//                 {message.length}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
//             <button
//               type="button"
//               onClick={() => handleFeatureClick('File Attachment')}
//               className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
//               title="Attach file"
//             >
//               <Paperclip className="w-5 h-5" />
//             </button>

//             <button
//               type="button"
//               onClick={() => handleFeatureClick('Image Upload')}
//               className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
//               title="Send image"
//             >
//               <Image className="w-5 h-5" />
//             </button>

//             {message.trim() ? (
//               <button
//                 type="submit"
//                 disabled={!message.trim()}
//                 className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
//                 aria-label="Send message"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             ) : (
//               <button
//                 type="button"
//                 onClick={() => handleFeatureClick('Voice Message')}
//                 className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
//                 title="Voice message"
//               >
//                 <Mic className="w-5 h-5" />
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default MessageInput;
import { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, X, Image, Mic } from 'lucide-react';
import Toast from '../common/Toast';

const MessageInput = ({ onSend, onTyping, replyTo = null, onCancelReply }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const typingTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

  const handleFeatureClick = (featureName) => {
    setToastMessage(`${featureName} - Coming Soon! 🚀`);
    setShowToast(true);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }

    if (!isTyping) {
      setIsTyping(true);
      onTyping?.(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping?.(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSend(message.trim(), replyTo?._id);
      setMessage('');
      setIsTyping(false);
      onTyping?.(false);
      
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type="feature"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      <div className="bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t-2 border-purple-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 shadow-lg">
        {replyTo && (
          <div className="mb-3 p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl flex items-start justify-between border-l-4 border-purple-500 shadow-md">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-purple-700 font-bold mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
                Replying to {replyTo.sender?.username}
              </p>
              <p className="text-sm text-gray-700 truncate">{replyTo.content}</p>
            </div>
            <button
              onClick={onCancelReply}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all ml-2 flex-shrink-0 transform hover:scale-110 active:scale-95"
              aria-label="Cancel reply"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end gap-1.5 sm:gap-2 lg:gap-3">
          <button
            type="button"
            onClick={() => handleFeatureClick('Emoji Picker')}
            className="hidden lg:flex text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-sm hover:shadow-md"
            title="Emoji"
          >
            <Smile className="w-6 h-6" />
          </button>

          <div className="flex-1 relative min-w-0">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows="1"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-12 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 resize-none transition-all shadow-sm hover:border-purple-300 text-base bg-white"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            
            {message.length > 100 && (
              <span className={`absolute bottom-2 right-3 text-xs font-semibold ${message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                {message.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleFeatureClick('File Attachment')}
              className="text-gray-500 hover:text-purple-600 hover:bg-purple-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleFeatureClick('Image Upload')}
              className="sm:hidden text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
              title="Send image"
            >
              <Image className="w-5 h-5" />
            </button>

            {message.trim() ? (
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 sm:p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleFeatureClick('Voice Message')}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2.5 sm:p-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                title="Voice message"
              >
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default MessageInput;

// // import { useState } from 'react';
// // import { Navigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import Sidebar from '../components/layout/Sidebar';
// // import ContactList from '../components/contacts/ConatactList';
// // import GroupList from '../components/groups/GroupList';
// // import ChatWindow from '../components/chat/ChatWindow';

// // const ChatPage = () => {
// //   const { isAuthenticated } = useAuth();
// //   const [activeTab, setActiveTab] = useState('chats');
// //   const [selectedContact, setSelectedContact] = useState(null);
// //   const [isGroup, setIsGroup] = useState(false);
// //   const [showSidebar, setShowSidebar] = useState(false);

// //   if (!isAuthenticated) {
// //     return <Navigate to="/" replace />;
// //   }

// //   const handleSelectContact = (contact, group = false) => {
// //     setSelectedContact(contact);
// //     setIsGroup(group);
// //     if (window.innerWidth < 768) {
// //       setShowSidebar(false);
// //     }
// //   };

// //   const handleSelectGroup = (group) => {
// //     setSelectedContact(group);
// //     setIsGroup(true);
// //     if (window.innerWidth < 768) {
// //       setShowSidebar(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 flex">
      
// //       {/* Sidebar - Hidden on mobile, shown on desktop */}
// //       <div className="hidden md:block h-full flex-shrink-0">
// //         <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
// //       </div>

// //       {/* Mobile Sidebar - Overlay */}
// //       {showSidebar && (
// //         <>
// //           <div 
// //             className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
// //             onClick={() => setShowSidebar(false)}
// //           ></div>
// //           <div className="md:hidden fixed left-0 top-0 bottom-0 z-50 h-full">
// //             <Sidebar 
// //               activeTab={activeTab} 
// //               onTabChange={setActiveTab}
// //               onClose={() => setShowSidebar(false)}
// //             />
// //           </div>
// //         </>
// //       )}

// //       {/* Contact/Group List - Responsive */}
// //       <div className="hidden sm:block h-full flex-shrink-0">
// //         {activeTab === 'chats' && (
// //           <ContactList
// //             onSelectContact={handleSelectContact}
// //             selectedContact={selectedContact}
// //           />
// //         )}
// //         {activeTab === 'groups' && (
// //           <GroupList
// //             onSelectGroup={handleSelectGroup}
// //             selectedGroup={selectedContact}
// //           />
// //         )}
// //         {activeTab === 'settings' && (
// //           <div className="w-80 lg:w-96 h-full overflow-y-auto bg-white border-r border-gray-200 flex flex-col items-center justify-center p-8">
// //             <div className="text-center">
// //               <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
// //                 <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                 </svg>
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
// //               <p className="text-gray-500 text-sm mb-6">Coming Soon</p>
// //               <div className="space-y-3 text-left">
// //                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// //                   <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
// //                   <span className="text-sm text-gray-600">Profile Settings</span>
// //                 </div>
// //                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// //                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
// //                   <span className="text-sm text-gray-600">Notifications</span>
// //                 </div>
// //                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// //                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
// //                   <span className="text-sm text-gray-600">Privacy & Security</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Chat Window - Full width on mobile, flexible on desktop */}
// //       <div className="flex-1 flex flex-col relative h-full overflow-hidden">
// //         {/* Mobile Header - Only show when no chat selected */}
// //         {!selectedContact && (
// //           <div className="md:hidden bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between shadow-lg flex-shrink-0">
// //             <div className="flex items-center gap-3">
// //               <button
// //                 onClick={() => setShowSidebar(true)}
// //                 className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
// //                 aria-label="Open menu"
// //               >
// //                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //                 </svg>
// //               </button>
// //               <h1 className="text-white text-xl font-bold">ChatApp</h1>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
// //               <span className="text-white text-sm">Online</span>
// //             </div>
// //           </div>
// //         )}

// //         {/* Mobile Contact/Group List - Show when no chat selected */}
// //         {!selectedContact && (
// //           <div className="md:hidden flex-1 h-full overflow-y-auto">
// //             {activeTab === 'chats' && (
// //               <ContactList
// //                 onSelectContact={handleSelectContact}
// //                 selectedContact={selectedContact}
// //               />
// //             )}
// //             {activeTab === 'groups' && (
// //               <GroupList
// //                 onSelectGroup={handleSelectGroup}
// //                 selectedGroup={selectedContact}
// //               />
// //             )}
// //             {activeTab === 'settings' && (
// //               <div className="bg-white h-full overflow-y-auto flex flex-col items-center justify-center p-6">
// //                 <div className="text-center max-w-sm">
// //                   <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
// //                     <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                     </svg>
// //                   </div>
// //                   <h3 className="text-2xl font-bold text-gray-800 mb-3">Settings</h3>
// //                   <p className="text-gray-500 mb-8">Coming Soon</p>
// //                   <div className="space-y-3">
// //                     <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
// //                       <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
// //                       <span className="text-sm font-medium text-gray-700">Profile Settings</span>
// //                     </div>
// //                     <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
// //                       <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
// //                       <span className="text-sm font-medium text-gray-700">Notifications</span>
// //                     </div>
// //                     <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
// //                       <div className="w-3 h-3 bg-green-400 rounded-full"></div>
// //                       <span className="text-sm font-medium text-gray-700">Privacy & Security</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Chat Window */}
// //         <div className={`${selectedContact ? 'flex' : 'hidden md:flex'} flex-1 h-full`}>
// //           <ChatWindow 
// //             selectedContact={selectedContact} 
// //             isGroup={isGroup}
// //             onBack={() => setSelectedContact(null)}
// //           />
// //         </div>
// //       </div>

// //       {/* Mobile Bottom Navigation */}
// //       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 flex-shrink-0">
// //         <div className="flex items-center justify-around py-2">
// //           <button
// //             onClick={() => {
// //               setActiveTab('chats');
// //               setSelectedContact(null);
// //             }}
// //             className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all ${
// //               activeTab === 'chats'
// //                 ? 'text-purple-600 bg-purple-50'
// //                 : 'text-gray-500 hover:text-gray-700'
// //             }`}
// //             aria-label="Chats"
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
// //             </svg>
// //             <span className="text-xs mt-1 font-medium">Chats</span>
// //           </button>

// //           <button
// //             onClick={() => {
// //               setActiveTab('groups');
// //               setSelectedContact(null);
// //             }}
// //             className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all ${
// //               activeTab === 'groups'
// //                 ? 'text-purple-600 bg-purple-50'
// //                 : 'text-gray-500 hover:text-gray-700'
// //             }`}
// //             aria-label="Groups"
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //             </svg>
// //             <span className="text-xs mt-1 font-medium">Groups</span>
// //           </button>

// //           <button
// //             onClick={() => {
// //               setActiveTab('settings');
// //               setSelectedContact(null);
// //             }}
// //             className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all ${
// //               activeTab === 'settings'
// //                 ? 'text-purple-600 bg-purple-50'
// //                 : 'text-gray-500 hover:text-gray-700'
// //             }`}
// //             aria-label="Settings"
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //             </svg>
// //             <span className="text-xs mt-1 font-medium">Settings</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;
// import { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Sidebar from '../components/layout/Sidebar';
// import ContactList from '../components/contacts/ConatactList';
// import GroupList from '../components/groups/GroupList';
// import ChatWindow from '../components/chat/ChatWindow';

// const ChatPage = () => {
//   const { isAuthenticated } = useAuth();
//   const [activeTab, setActiveTab] = useState('chats');
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [isGroup, setIsGroup] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);

//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }

//   const handleSelectContact = (contact, group = false) => {
//     setSelectedContact(contact);
//     setIsGroup(group);
//     if (window.innerWidth < 768) {
//       setShowSidebar(false);
//     }
//   };

//   const handleSelectGroup = (group) => {
//     setSelectedContact(group);
//     setIsGroup(true);
//     if (window.innerWidth < 768) {
//       setShowSidebar(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 flex">
      
//       {/* Desktop Sidebar */}
//       <div className="hidden md:block h-full flex-shrink-0">
//         <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {showSidebar && (
//         <>
//           <div 
//             className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
//             onClick={() => setShowSidebar(false)}
//           />
//           <div className="md:hidden fixed left-0 top-0 bottom-0 z-50 h-full">
//             <Sidebar 
//               activeTab={activeTab} 
//               onTabChange={setActiveTab}
//               onClose={() => setShowSidebar(false)}
//             />
//           </div>
//         </>
//       )}

//       {/* Contact/Group List (Desktop) */}
//       <div className="hidden sm:block h-full flex-shrink-0">
//         {activeTab === 'chats' && (
//           <ContactList
//             onSelectContact={handleSelectContact}
//             selectedContact={selectedContact}
//           />
//         )}
//         {activeTab === 'groups' && (
//           <GroupList
//             onSelectGroup={handleSelectGroup}
//             selectedGroup={selectedContact}
//           />
//         )}
//         {activeTab === 'settings' && (
//           <div className="w-80 h-full bg-white border-r border-gray-200 flex items-center justify-center p-8">
//             <div className="text-center">
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
//               <p className="text-gray-500 text-sm">Coming Soon</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
//         {/* Mobile Header */}
//         {!selectedContact && (
//           <div className="md:hidden bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between shadow-lg flex-shrink-0">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowSidebar(true)}
//                 className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               <h1 className="text-white text-xl font-bold">ChatApp</h1>
//             </div>
//           </div>
//         )}

//         {/* Mobile Lists */}
//         {!selectedContact && (
//           <div className="md:hidden flex-1 h-full overflow-hidden">
//             {activeTab === 'chats' && (
//               <ContactList
//                 onSelectContact={handleSelectContact}
//                 selectedContact={selectedContact}
//               />
//             )}
//             {activeTab === 'groups' && (
//               <GroupList
//                 onSelectGroup={handleSelectGroup}
//                 selectedGroup={selectedContact}
//               />
//             )}
//             {activeTab === 'settings' && (
//               <div className="h-full bg-white flex items-center justify-center p-6">
//                 <div className="text-center">
//                   <h3 className="text-2xl font-bold text-gray-800 mb-2">Settings</h3>
//                   <p className="text-gray-500">Coming Soon</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Chat Window */}
//         <div className={`${selectedContact ? 'flex' : 'hidden md:flex'} flex-1 h-full overflow-hidden`}>
//           <ChatWindow 
//             selectedContact={selectedContact} 
//             isGroup={isGroup}
//             onBack={() => setSelectedContact(null)}
//           />
//         </div>
//       </div>

//       {/* Mobile Bottom Nav */}
//       {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
//         <div className="flex items-center justify-around py-2">
//           <button
//             onClick={() => {
//               setActiveTab('chats');
//               setSelectedContact(null);
//             }}
//             className={`flex flex-col items-center px-4 py-2 rounded-lg ${
//               activeTab === 'chats' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
//             }`}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <span className="text-xs mt-1 font-medium">Chats</span>
//           </button>

//           <button
//             onClick={() => {
//               setActiveTab('groups');
//               setSelectedContact(null);
//             }}
//             className={`flex flex-col items-center px-4 py-2 rounded-lg ${
//               activeTab === 'groups' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
//             }`}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             <span className="text-xs mt-1 font-medium">Groups</span>
//           </button>

//           <button
//             onClick={() => {
//               setActiveTab('settings');
//               setSelectedContact(null);
//             }}
//             className={`flex flex-col items-center px-4 py-2 rounded-lg ${
//               activeTab === 'settings' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
//             }`}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//             <span className="text-xs mt-1 font-medium">Settings</span>
//           </button>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default ChatPage;
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import ContactList from '../components/contacts/ConatactList';
import GroupList from '../components/groups/GroupList';
import ChatWindow from '../components/chat/ChatWindow';

const ChatPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isGroup, setIsGroup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSelectContact = (contact, group = false) => {
    setSelectedContact(contact);
    setIsGroup(group);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleSelectGroup = (group) => {
    setSelectedContact(group);
    setIsGroup(true);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 flex">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full flex-shrink-0">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          />
          <div className="md:hidden fixed left-0 top-0 bottom-0 z-50 h-full">
            <Sidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
              onClose={() => setShowSidebar(false)}
            />
          </div>
        </>
      )}

      {/* Contact/Group List (Desktop) */}
      <div className="hidden sm:block h-full flex-shrink-0">
        {activeTab === 'chats' && (
          <ContactList
            onSelectContact={handleSelectContact}
            selectedContact={selectedContact}
          />
        )}
        {activeTab === 'groups' && (
          <GroupList
            onSelectGroup={handleSelectGroup}
            selectedGroup={selectedContact}
          />
        )}
        {activeTab === 'settings' && (
          <div className="w-80 h-full bg-white border-r border-gray-200 flex items-center justify-center p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
              <p className="text-gray-500 text-sm">Coming Soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        {!selectedContact && (
          <div className="md:hidden bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between shadow-lg flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-white text-xl font-bold">ChatApp</h1>
            </div>
          </div>
        )}

        {/* Mobile Lists - Add bottom padding for nav */}
        {!selectedContact && (
          <div className="md:hidden flex-1 h-full overflow-hidden pb-16">
            {activeTab === 'chats' && (
              <ContactList
                onSelectContact={handleSelectContact}
                selectedContact={selectedContact}
              />
            )}
            {activeTab === 'groups' && (
              <GroupList
                onSelectGroup={handleSelectGroup}
                selectedGroup={selectedContact}
              />
            )}
            {activeTab === 'settings' && (
              <div className="h-full bg-white flex items-center justify-center p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Settings</h3>
                  <p className="text-gray-500">Coming Soon</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chat Window */}
        <div className={`${selectedContact ? 'flex' : 'hidden md:flex'} flex-1 h-full overflow-hidden`}>
          <ChatWindow 
            selectedContact={selectedContact} 
            isGroup={isGroup}
            onBack={() => setSelectedContact(null)}
          />
        </div>
      </div>

      {/* Mobile Bottom Nav - Only show when no chat selected */}
      {!selectedContact && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
          <div className="flex items-center justify-around py-2">
            <button
              onClick={() => {
                setActiveTab('chats');
                setSelectedContact(null);
              }}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${
                activeTab === 'chats' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs mt-1 font-medium">Chats</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('groups');
                setSelectedContact(null);
              }}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${
                activeTab === 'groups' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs mt-1 font-medium">Groups</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('settings');
                setSelectedContact(null);
              }}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${
                activeTab === 'settings' ? 'text-purple-600 bg-purple-50' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs mt-1 font-medium">Settings</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

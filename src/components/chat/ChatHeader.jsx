

// export default ChatHeader;
import { useState } from 'react';
import { Phone, Video, MoreVertical, Users, ArrowLeft, Search, Settings } from 'lucide-react';
import Avatar from '../common/Avatar';
import Toast from '../common/Toast';
// import GroupSettingsModal from '../groups/GroupSettingsModal';
import GroupSettingsModal from '../groups/GroupSettingModal';
import { formatLastSeen } from '../../utils/helper';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';

const ChatHeader = ({ contact, isGroup = false, memberCount = 0, onBack, onGroupDeleted, onGroupLeft }) => {
  const { onlineUsers } = useSocket();
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const isOnline = contact && onlineUsers.has(contact._id || contact.id);

  const handleFeatureClick = (featureName) => {
    setToastMessage(`${featureName} - Coming Soon! 🚀`);
    setShowToast(true);
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

      {showGroupSettings && isGroup && (
        <GroupSettingsModal
          group={contact}
          currentUser={user}
          onClose={() => setShowGroupSettings(false)}
          onGroupDeleted={onGroupDeleted}
          onGroupLeft={onGroupLeft}
        />
      )}

      <div className="h-16 sm:h-18 lg:h-20 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 shadow-lg flex items-center justify-between px-3 sm:px-4 lg:px-6 flex-shrink-0">
        
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {/* Back Button (Mobile & Tablet) */}
          {onBack && (
            <button
              onClick={onBack}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Avatar with gradient ring */}
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-all"></div>
            <div className="relative">
              <Avatar user={contact} size="sm" showOnline={!isGroup && isOnline} className="sm:w-12 sm:h-12" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm sm:text-base lg:text-lg truncate">
              {contact?.name || contact?.username || 'Unknown'}
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 flex items-center gap-1">
              {isGroup ? (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span className="font-medium">{memberCount} members</span>
                </span>
              ) : isOnline ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="font-medium">Online</span>
                </span>
              ) : contact?.lastSeen ? (
                <span className="truncate">Last seen {formatLastSeen(contact.lastSeen)}</span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  Offline
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Button (Desktop) */}
          <button 
            onClick={() => handleFeatureClick('Search Messages')}
            className="hidden lg:flex text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
            aria-label="Search messages"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Voice Call */}
          <button 
            onClick={() => handleFeatureClick('Voice Call')}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
            aria-label="Voice call"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Video Call (Hidden on mobile) */}
          <button 
            onClick={() => handleFeatureClick('Video Call')}
            className="hidden sm:flex text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
            aria-label="Video call"
          >
            <Video className="w-5 h-5" />
          </button>

          {/* Group Settings or More Options */}
          {isGroup ? (
            <button 
              onClick={() => setShowGroupSettings(true)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
              aria-label="Group settings"
            >
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          ) : (
            <button 
              onClick={() => handleFeatureClick('More Options')}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95"
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHeader;

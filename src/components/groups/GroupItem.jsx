import Avatar from '../common/Avatar';
import { formatTime, truncateText } from '../../utils/helper';
import { Users, Crown } from 'lucide-react';

const GroupItem = ({ group, onClick, isActive = false }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 relative ${
        isActive 
          ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600' 
          : 'hover:bg-gray-50 active:bg-gray-100'
      }`}
    >
      {/* Group Avatar with gradient ring for active */}
      <div className="relative flex-shrink-0">
        {isActive && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 blur"></div>
        )}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
            <Users className="w-6 h-6 text-white" />
          </div>
          {/* Admin Badge */}
          <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-white shadow-sm">
            <Crown className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      </div>

      {/* Group Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-semibold truncate ${
            isActive ? 'text-purple-900' : 'text-gray-800'
          }`}>
            {group.name}
          </h4>
          {group.lastMessageAt && (
            <span className={`text-xs flex-shrink-0 ml-2 ${
              isActive ? 'text-purple-600 font-medium' : 'text-gray-500'
            }`}>
              {formatTime(group.lastMessageAt)}
            </span>
          )}
        </div>

        {/* Members Count */}
        <div className="flex items-center justify-between gap-2">
          <p className={`text-sm flex items-center gap-1.5 ${
            isActive ? 'text-purple-700 font-medium' : 'text-gray-600'
          }`}>
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{group.members?.length || 0} member{group.members?.length !== 1 ? 's' : ''}</span>
          </p>

          {/* Unread Badge (if applicable) */}
          {group.unreadCount > 0 && (
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
              {group.unreadCount > 99 ? '99+' : group.unreadCount}
            </span>
          )}
        </div>

        {/* Last Message Preview (optional) */}
        {group.lastMessage && (
          <p className={`text-xs truncate mt-1 ${
            isActive ? 'text-purple-600' : 'text-gray-500'
          }`}>
            {truncateText(group.lastMessage, 35)}
          </p>
        )}
      </div>

      {/* Active Indicator Dot */}
      {isActive && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default GroupItem;

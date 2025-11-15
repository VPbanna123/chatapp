import { getAvatarColor, getInitials } from '../../utils/helper';

const Avatar = ({ user, size = 'md', showOnline = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
  };

  const onlineDotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  };

  return (
    <div className="relative inline-block">
      {user?.avatar && user.avatar !== 'https://via.placeholder.com/150' ? (
        <div className="relative group">
          {/* Gradient ring effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-75 blur transition-opacity duration-300"></div>
          <img
            src={user.avatar}
            alt={user.username}
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-md relative transition-transform duration-300 group-hover:scale-105`}
          />
        </div>
      ) : (
        <div className="relative group">
          {/* Gradient ring effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-75 blur transition-opacity duration-300"></div>
          <div
            className={`${sizeClasses[size]} ${getAvatarColor(
              user?.username || 'U'
            )} rounded-full flex items-center justify-center text-white font-bold shadow-lg relative transition-transform duration-300 group-hover:scale-105 border-2 border-white`}
          >
            {getInitials(user?.username || 'User')}
          </div>
        </div>
      )}
      
      {/* Online Indicator */}
      {showOnline && user?.isOnline && (
        <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center">
          <span className={`${onlineDotSize[size]} bg-green-500 border-2 border-white rounded-full relative z-10`}></span>
          <span className={`${onlineDotSize[size]} bg-green-500 rounded-full absolute animate-ping`}></span>
        </span>
      )}

      {/* Offline Indicator (optional - show when not online but user exists) */}
      {showOnline && user && !user.isOnline && (
        <span className={`absolute -bottom-0.5 -right-0.5 ${onlineDotSize[size]} bg-gray-400 border-2 border-white rounded-full`}></span>
      )}
    </div>
  );
};

export default Avatar;

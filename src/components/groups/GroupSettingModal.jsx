import { useState } from 'react';
import { X, Trash2, LogOut, Users, Shield, AlertTriangle } from 'lucide-react';
import { groupAPI } from '../../services/api';
import Toast from '../common/Toast';
import Loader from '../common/Loader';

const GroupSettingsModal = ({ group, currentUser, onClose, onGroupDeleted, onGroupLeft }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [localGroup, setLocalGroup] = useState(group);

  // Helpers for id extraction handling populated or unpopulated fields
  const getAdminId = () => {
    if (typeof localGroup.admin === 'string') return localGroup.admin;
    return localGroup.admin?._id || localGroup.admin?.id || '';
  };

  const getCurrentUserId = () => {
    return currentUser._id || currentUser.id || '';
  };

  const isAdmin = getAdminId() === getCurrentUserId();

  const getMemberUserId = (member) => {
    if (typeof member.user === 'string') return member.user;
    return member.user?._id || member.user?.id || '';
  };

  const getMemberUsername = (member) => {
    if (typeof member.user === 'string') return 'Unknown';
    return member.user?.username || 'Unknown';
  };

  // Refresh group locally after member removal
  const refreshLocalGroup = async () => {
    try {
      const response = await groupAPI.getGroupById(localGroup._id);
      if (response.data.success) {
        setLocalGroup(response.data.group);
      }
    } catch (err) {
      console.error('Failed to refresh group data', err);
    }
  };

  // Remove a member (admin only, cannot remove self or other admins)
  const handleRemoveMember = async (memberId) => {
    setLoading(true);
    try {
      if (memberId === getCurrentUserId()) {
        throw new Error('You cannot remove yourself. Use leave group option instead.');
      }
      // Check if member is admin to prevent removal
      const member = localGroup.members.find(m => getMemberUserId(m) === memberId);
      if (member?.role === 'admin') {
        throw new Error('Cannot remove other admins.');
      }
      const response = await groupAPI.removeMember({ groupId: localGroup._id, userId: memberId });
      if (response.data.success) {
        setToastMessage('Member removed successfully');
        setToastType('success');
        setShowToast(true);
        await refreshLocalGroup();
      }
    } catch (error) {
      setToastMessage(error.message || 'Failed to remove member');
      setToastType('warning');
      setShowToast(true);
    }
    setLoading(false);
  };

  // Delete group (admin only)
  const handleDeleteGroup = async () => {
    setLoading(true);
    try {
      const response = await groupAPI.deleteGroup(localGroup._id);
      if (response.data.success) {
        setToastMessage('Group deleted successfully!');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          onGroupDeleted();
          onClose();
        }, 1500);
      }
    } catch (error) {
      setToastMessage(error.response?.data?.message || 'Failed to delete group');
      setToastType('warning');
      setShowToast(true);
    }
    setLoading(false);
    setShowDeleteConfirm(false);
  };

  // Leave group (any member, admin must assign replacement)
  const handleLeaveGroup = async () => {
    setLoading(true);
    try {
      const response = await groupAPI.leaveGroup(localGroup._id);
      if (response.data.success) {
        setToastMessage('Left group successfully!');
        setToastType('success');
        setShowToast(true);
        setTimeout(() => {
          onGroupLeft();
          onClose();
        }, 1500);
      }
    } catch (error) {
      setToastMessage(error.response?.data?.message || 'Failed to leave group');
      setToastType('warning');
      setShowToast(true);
    }
    setLoading(false);
    setShowLeaveConfirm(false);
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-fadeIn">

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Group Settings</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
            
            {/* Group Info */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {localGroup.name?.charAt(0).toUpperCase() || 'G'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{localGroup.name}</h3>
                    {isAdmin && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{localGroup.members?.length || 0} members</p>
                </div>
              </div>
              {localGroup.description && (
                <p className="text-sm text-gray-600 mt-2">{localGroup.description}</p>
              )}
            </div>

            {/* Members List with Remove Buttons */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-800">Members</h3>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {localGroup.members?.map((member) => {
                  const memberUserId = getMemberUserId(member);
                  const memberUsername = getMemberUsername(member);
                  const isCurrentUserMember = memberUserId === getCurrentUserId();
                  const isMemberAdmin = member.role === 'admin';

                  return (
                    <div key={memberUserId} className="flex items-center justify-between bg-white rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 text-sm font-semibold">
                          {memberUsername.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {memberUsername}
                          {isCurrentUserMember && (
                            <span className="text-xs text-gray-500 ml-1">(You)</span>
                          )}
                        </span>
                      </div>

                      {/* Remove Button */}
                      {isAdmin && !isCurrentUserMember && !isMemberAdmin && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(memberUserId)}
                          className="text-red-500 hover:underline"
                          title="Remove member"
                          disabled={loading}
                        >
                          Remove
                        </button>
                      )}

                      {/* Admin Badge */}
                      {isMemberAdmin && (
                        <Shield className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 animate-fadeIn">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-900 mb-1">Delete Group?</h4>
                    <p className="text-sm text-red-700">This action cannot be undone. All messages and data will be permanently deleted.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteGroup}
                    disabled={loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <Loader size="sm" /> : 'Yes, Delete'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Leave Confirmation */}
            {showLeaveConfirm && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-4 animate-fadeIn">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-orange-900 mb-1">Leave Group?</h4>
                    <p className="text-sm text-orange-700">
                      {isAdmin
                        ? 'You must assign another admin before leaving the group.'
                        : 'You will no longer receive messages from this group.'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleLeaveGroup}
                    disabled={loading}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {loading ? <Loader size="sm" /> : 'Yes, Leave'}
                  </button>
                  <button
                    onClick={() => setShowLeaveConfirm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!showDeleteConfirm && !showLeaveConfirm && (
              <div className="space-y-3 pt-2">
                {isAdmin && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold py-3 px-4 rounded-xl transition-all border-2 border-red-200 hover:border-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Group
                  </button>
                )}

                <button
                  onClick={() => setShowLeaveConfirm(true)}
                  className="w-full flex items-center justify-center gap-3 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold py-3 px-4 rounded-xl transition-all border-2 border-orange-200 hover:border-orange-300"
                >
                  <LogOut className="w-5 h-5" />
                  Leave Group
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </>
  );
};

export default GroupSettingsModal;

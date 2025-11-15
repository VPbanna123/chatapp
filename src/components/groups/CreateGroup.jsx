import { useState } from 'react';
import { X, Users, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { groupAPI, userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';

const CreateGroup = ({ onClose, onGroupCreated }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const handleNext = async () => {
    if (step === 1) {
      if (!groupName.trim()) {
        toast.error('Please enter a group name');
        return;
      }
      setLoadingUsers(true);
      try {
        const response = await userAPI.getAllUsers(user.id);
        if (response.data.success) {
          setAllUsers(response.data.users);
          setStep(2);
        }
      } catch (error) {
        toast.error('Error loading users');
      } finally {
        setLoadingUsers(false);
      }
    }
  };

  const toggleMember = (userId) => {
    setSelectedMembers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member');
      return;
    }

    setLoading(true);
    try {
      const response = await groupAPI.createGroup({
        name: groupName,
        description: groupDescription,
        admin: user.id,
        members: selectedMembers,
      });

      if (response.data.success) {
        toast.success('Group created successfully!');
        onGroupCreated(response.data.group);
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-fade-in">
        
        {/* Decorative Header Bar */}
        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
              {step === 1 ? (
                <>
                  <Users className="w-6 h-6 text-purple-600" />
                  Create Group
                </>
              ) : (
                <>
                  <Users className="w-6 h-6 text-purple-600" />
                  Add Members
                </>
              )}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Step {step} of 2
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 ? (
            <div className="space-y-5">
              {/* Group Icon Placeholder */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Users className="w-12 h-12 text-purple-600" />
                </div>
              </div>

              {/* Group Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Family, Work Team, Friends"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all font-medium"
                  maxLength={50}
                  autoFocus
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    {groupName.length}/50 characters
                  </p>
                  {groupName.length > 0 && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              {/* Group Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="What's this group about?"
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 resize-none transition-all"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {groupDescription.length}/200 characters
                </p>
              </div>
            </div>
          ) : loadingUsers ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader size="lg" />
              <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Selected Members Counter */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-xl mb-4 border border-purple-200">
                <p className="text-sm font-bold text-purple-900 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                  </span>
                  {selectedMembers.length > 0 && (
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  )}
                </p>
              </div>

              {/* Users List */}
              {allUsers.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => toggleMember(contact._id)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all transform hover:scale-102 ${
                    selectedMembers.includes(contact._id)
                      ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-500 shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative">
                      <Avatar user={contact} size="sm" />
                      {selectedMembers.includes(contact._id) && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 blur"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate ${
                        selectedMembers.includes(contact._id) 
                          ? 'text-purple-900' 
                          : 'text-gray-800'
                      }`}>
                        {contact.username}
                      </h4>
                      <p className="text-xs text-gray-600 truncate">{contact.email}</p>
                    </div>
                  </div>

                  {selectedMembers.includes(contact._id) && (
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-1.5 rounded-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {allUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="font-medium">No users available</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          
          <button
            onClick={step === 1 ? handleNext : handleCreateGroup}
            disabled={loading || loadingUsers || (step === 1 && !groupName.trim()) || (step === 2 && selectedMembers.length === 0)}
            className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading || loadingUsers ? (
              <Loader size="sm" />
            ) : step === 1 ? (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Users className="w-4 h-4" />
                Create Group
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;

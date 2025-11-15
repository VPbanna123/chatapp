import Group from '../models/Group.js';
import User from '../models/User.js';

// Create group
export const createGroup = async (req, res) => {
  try {
    const admin = req.user._id; //  From JWT
    const { name, description, avatar, members } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Group name is required'
      });
    }

    if (!members || members.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one member is required'
      });
    }

    // Prepare members array with admin
    const groupMembers = [
      { user: admin, role: 'admin', joinedAt: Date.now() }
    ];

    // Add other members
    members.forEach(memberId => {
      if (memberId !== admin.toString()) {
        groupMembers.push({
          user: memberId,
          role: 'member',
          joinedAt: Date.now()
        });
      }
    });

    // Create group
    const group = await Group.create({
      name,
      description: description || '',
      avatar: avatar || undefined,
      admin,
      members: groupMembers
    });

    // Populate members
    await group.populate('members.user', 'username avatar');
    await group.populate('admin', 'username avatar');

    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group
    });

  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating group',
      error: error.message
    });
  }
};

// Get user's groups
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id; // From JWT

    const groups = await Group.find({
      'members.user': userId,
      isActive: true
    })
    .populate('members.user', 'username avatar isOnline')
    .populate('admin', 'username avatar')
    .populate('lastMessage')
    .sort({ lastMessageAt: -1 });

    res.status(200).json({
      success: true,
      groups
    });

  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching groups',
      error: error.message
    });
  }
};

// Get group by ID
export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id; //  From JWT

    const group = await Group.findById(id)
      .populate('members.user', 'username avatar isOnline lastSeen')
      .populate('admin', 'username avatar')
      .populate('lastMessage');

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    //  Verify user is member
    const isMember = group.members.some(
      m => m.user._id.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        success: false,
        message: 'You are not a member of this group'
      });
    }

    res.status(200).json({
      success: true,
      group
    });

  } catch (error) {
    console.error('Get group error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching group',
      error: error.message
    });
  }
};

// Add member to group
export const addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const addedBy = req.user._id; //  From JWT

    if (!groupId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID and User ID are required'
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    // Check if user adding is admin
    const isAdmin = group.members.some(
      m => m.user.toString() === addedBy.toString() && m.role === 'admin'
    );

    if (!isAdmin && group.admin.toString() !== addedBy.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can add members'
      });
    }

    // Check if user is already a member
    const isMember = group.members.some(m => m.user.toString() === userId);

    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member'
      });
    }

    // Add member
    group.members.push({
      user: userId,
      role: 'member',
      joinedAt: Date.now()
    });

    await group.save();
    await group.populate('members.user', 'username avatar');

    res.status(200).json({
      success: true,
      message: 'Member added successfully',
      group
    });

  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding member',
      error: error.message
    });
  }
};

// Remove member from group
export const removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const removedBy = req.user._id; //  From JWT

    if (!groupId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID and User ID are required'
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    // Check if user removing is admin
    const isAdmin = group.members.some(
      m => m.user.toString() === removedBy.toString() && m.role === 'admin'
    );

    if (!isAdmin && group.admin.toString() !== removedBy.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can remove members'
      });
    }

    // Remove member
    group.members = group.members.filter(m => m.user.toString() !== userId);

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
      group
    });

  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing member',
      error: error.message
    });
  }
};

// Update group
export const updateGroup = async (req, res) => {
  try {
    const { groupId, name, description, avatar } = req.body;
    const userId = req.user._id; //  From JWT

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required'
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    // Check if user is admin
    const isAdmin = group.members.some(
      m => m.user.toString() === userId.toString() && m.role === 'admin'
    );

    if (!isAdmin && group.admin.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only admins can update group'
      });
    }

    // Update fields
    if (name) group.name = name;
    if (description !== undefined) group.description = description;
    if (avatar) group.avatar = avatar;

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Group updated successfully',
      group
    });

  } catch (error) {
    console.error('Update group error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating group',
      error: error.message
    });
  }
};

// Leave group
export const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user._id; //  From JWT

    if (!groupId) {
      return res.status(400).json({
        success: false,
        message: 'Group ID is required'
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }

    // Can't leave if you're the only admin
    if (group.admin.toString() === userId.toString()) {
      const otherAdmins = group.members.filter(
        m => m.role === 'admin' && m.user.toString() !== userId.toString()
      );

      if (otherAdmins.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'You must assign another admin before leaving'
        });
      }
    }

    // Remove member
    group.members = group.members.filter(m => m.user.toString() !== userId.toString());

    // If no members left, deactivate group
    if (group.members.length === 0) {
      group.isActive = false;
    }

    await group.save();

    res.status(200).json({
      success: true,
      message: 'Left group successfully'
    });

  } catch (error) {
    console.error('Leave group error:', error);
    res.status(500).json({
      success: false,
      message: 'Error leaving group',
      error: error.message
    });
  }
};

// delete group by admin only other cant do anything
export const deleteGroup =async(req,res)=>{
  try {
    const {groupId}=req.body;
    const userId=req.user._id;
    if(!groupId){
      return res.status(400).json({
        success: false,
        message: 'Group ID is required'
      });
    }


    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Group not found'
      });
    }
//  Check if user is the main admin
    if (group.admin.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the group creator can delete this group'
      });
    }
//  Delete the group permanently
    await Group.findByIdAndDelete(groupId);

    res.status(200).json({
      success: true,
      message: 'Group deleted successfully'
    });

  } catch (error) {
    console.error('Delete group error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting group',
      error: error.message
    });
  
  }
}
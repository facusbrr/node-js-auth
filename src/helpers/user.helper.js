import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export const getUserById = async (userId) => {
  return await User.findById(userId).exec();
};

export const getUserRoles = async (user) => {
  return await Role.find({ _id: { $in: user.roles } }).exec();
};

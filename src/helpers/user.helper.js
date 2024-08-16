import User from '../models/User';
import Role from '../models/Role';

export const getUserById = async (userId) => {
  return await User.findById(userId).exec();
};

export const getUserRoles = async (user) => {
  return await Role.find({ _id: { $in: user.roles } }).exec();
};

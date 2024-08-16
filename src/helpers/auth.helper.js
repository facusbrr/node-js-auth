import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import { User, Role } from '../models';

export const createUser = async (userData) => {
  const user = new User({
    username: userData.username,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 8),
  });
  return await user.save();
};

export const assignRolesToUser = async (user, roles) => {
  const foundRoles = await Role.find({ name: { $in: roles } }).exec();
  user.roles = foundRoles.map((role) => role._id);
  return await user.save();
};

export const assignDefaultRoleToUser = async (user) => {
  const role = await Role.findOne({ name: 'user' }).exec();
  user.roles = [role._id];
  return await user.save();
};

export const findUserByUsername = async (username) => {
  return await User.findOne({ username }).populate('roles', '-__v').exec();
};

export const comparePassword = (inputPassword, userPassword) => {
  return bcrypt.compareSync(inputPassword, userPassword);
};

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.secret, {
    algorithm: 'HS256',
    allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  });
};

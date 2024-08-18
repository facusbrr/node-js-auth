import mongoose from 'mongoose';
import User from './user.model.js';
import Role from './role.model.js';

// Configure Mongoose to use global promises
mongoose.Promise = global.Promise;

const ROLES = ['user', 'admin', 'moderator'];

export { mongoose, User, Role, ROLES };
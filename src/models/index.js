import mongoose from 'mongoose';
import { User } from './user.model';
import { Role } from './role.model';
// Configurar Mongoose para usar las promesas globales
mongoose.Promise = global.Promise;

export const db = {
  mongoose,
  User,
  Role,
  ROLES: ['user', 'admin', 'moderator'],
};

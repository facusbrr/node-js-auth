import mongoose from 'mongoose';
import { HOST, PORT, DB } from '../config/db.config.js';
import { Role } from '../models/role.model.js';

export const db = {
  mongoose,
  url: `mongodb://${HOST}:${PORT}/${DB}`,
  Role,
};

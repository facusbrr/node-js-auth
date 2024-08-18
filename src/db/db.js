import mongoose from 'mongoose';
import { HOST, PORT, DB } from '../config/db.config.js';
import { Role, User } from '../models/index.js';

export const db = {
  mongoose,
  url: `mongodb://${HOST}:${PORT}/${DB}`,
  Role,
};

import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const Role = model('Role', roleSchema);

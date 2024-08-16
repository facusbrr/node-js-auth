import { Schema, model } from 'mongoose';

// Definir el esquema para el modelo User
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

// Crear el modelo User usando el esquema definido
export const User = model('User', userSchema);

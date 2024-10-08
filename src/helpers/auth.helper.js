import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import { User, Role } from '../models/index.js';
// Lógica de Negocio: Se encuentra en los servicios o helpers que realizan operaciones específicas.
export const createUser = async (userData) => {
  try {
    // Validaciones de los datos del usuario
    if (!userData || typeof userData !== 'object') {
      throw new Error('Datos de usuario inválidos');
    }

    const { username, email, password } = userData;

    if (!username || !email || !password) {
      throw new Error('Faltan datos requeridos: username, email o userPassword');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Creación del usuario
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    return await user.save();
  } catch (err) {
    console.error('Error al crear el usuario: ', err.message);
    throw new Error('Error al crear usuario: ' + err.message);
  }
};

// Asigna roles al usuario correctamente
export const assignRolesToUser = async (user, roles) => {
  try{
    const foundRoles = await Role.find({ name: { $in: roles } }).exec();
    user.roles = foundRoles.map((role) => role._id);
    return await user.save();
  }catch(err){
    console.error('Error al asignar roles al usuario: ', err);
    throw new Error('Error al asignar roles al usuario: ' + err.msg)
  }
};

// Esta función asigna un rol por defecto al usuario correctamente.
export const assignDefaultRoleToUser = async (user) => {
  try {
    const role = await Role.findOne({ name: 'user' }).exec();
    user.roles = [role._id];
    return await user.save();
  }catch(err){
    console.error('Error al asignar el rol por defecto al usuario: ', err);
    throw new Error('Error al asignar el rol por defecto al usuario: ' + err.msg)
  }
};

// Esta función busca un usuario por su nombre de usuario y popula los roles correctamente.
export const findUserByUsername = async (username) => {
  try{
    return await User.findOne({ username }).populate('roles', '-__v').exec();
  } catch(err){
    console.error('Error al buscar al usuario por su username ', err);
    throw new Error('Error al buscar al usuario por su username: ' + err.msg)
  }
};

// Compara las contraseña ingresada con la contraseña almacenada
export const comparePassword = (inputPassword, userPassword) => {
  try{
    return bcrypt.compareSync(inputPassword, userPassword);
  } catch(err){
    console.error('Error al comparar contraseñas:', err);
    throw new Error('Error al comparar contraseñas: ' + err.message);
  }
};

export const generateToken = (userId) => {
  try{

    //Genera un token JWT
    return jwt.sign({ id: userId }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });
  } catch(err){
    console.error('Error al generar el token:', err);
    throw new Error('Error al generar el token: ' + err.message);
  }
};

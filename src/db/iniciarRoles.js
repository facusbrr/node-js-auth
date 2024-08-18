import { db } from './db.js';

const Role = db.Role;

const crearRoles = async (roleName) => {
  if (!roleName) return console.error('El nombre del rol no puede estar vacío')
  try {
    const role = new Role({ name: roleName });
    await role.save();
    console.log(`Se agregó '${roleName}' el rol a la colección`);
  } catch (err) {
    console.error(`Error al agregar '${roleName}' el rol a la colección`, err.msg);
  }
};

export const initial = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await crearRoles('user');
      await crearRoles('moderator');
      await crearRoles('admin');
    }
  } catch (err) {
    console.error('Error al inicializar roles', err.msg, err.stack); // Imprime el seguimiendo de la pila cuando ocurre un error-err.stack
  }
};
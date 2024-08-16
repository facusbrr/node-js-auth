import { db } from './db.js';

const Role = db.Role;

const crearRoles = async (roleName) => {
  try {
    const role = new Role({ name: roleName });
    await role.save();
    console.log(`Se agregó '${roleName}' el rol a la colección`);
  } catch (err) {
    console.error(`Error al agregar '${roleName}' el rol a la colección`, err);
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
    console.error('Error al inicializar roles', err);
  }
};
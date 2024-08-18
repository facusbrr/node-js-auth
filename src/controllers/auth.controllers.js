import { createUser, assignRolesToUser, assignDefaultRoleToUser, findUserByUsername, comparePassword, generateToken } from '../helpers/auth.helper.js';

export const signup = async (req, res) => {
  try {
    const user = await createUser(req.body);

    if (req.body.roles) {
      await assignRolesToUser(user, req.body.roles);
    } else {
      await assignDefaultRoleToUser(user);
    }

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await findUserByUsername(req.body.username);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const passwordIsValid = await comparePassword(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: 'Contraseña inválida!',
      });
    }

    const token = generateToken(user.id);

    const authorities = user.roles.map(
      (role) => 'ROLE_' + role.name.toUpperCase()
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
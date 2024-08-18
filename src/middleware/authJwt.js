import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import { getUserById, getUserRoles } from '../helpers/user.helper.js';

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({ msg: 'No existe el token' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Sin autorización' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    const roles = await getUserRoles(user);

    if (roles.some((role) => role.name === 'admin')) {
      next();
    } else {
      res.status(403).json({ msg: 'Requiere ser admin!' }); //403: Prohibido/Forbidden
    }
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    const roles = await getUserRoles(user);

    if (roles.some((role) => role.name === 'moderator')) {
      next();
    } else {
      res.status(403).json({ msg: 'Requiere ser moderador' });
    }
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

export const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
}
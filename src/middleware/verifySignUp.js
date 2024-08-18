import { ROLES, User } from '../models/index.js';

const checkUserOrEmail = async (req, res, next) => {
  try {
    // User
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ msg: 'El usuario está en uso' });

    // Email
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ msg: 'El email está en uso' });

    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const checkRoles = async (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i]))
          return res
            .status(400)
            .json({ msg: `El rol ${req.body.roles[i]} no existe` });
      }
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const verifySignUp = {
  checkUserOrEmail,
  checkRoles
};
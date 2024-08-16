import { Roles, User } from '../models';
import { User } from '../models/user.model';

export const checkUserOrEmail = async (req, res, next) => {
  try {
    //User
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ msg: 'El usuario esta en uso' });

    //Email
    user = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).json({ msg: 'El email esta en uso' });

    next();
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

export const checkRoles = async (req, res, next) => {
  try {
    if (req.body.Roles) {
      for (let i = 0; i < req.body.Roles.length; i++) {
        if (!Roles.includes(req.body.roles[i]))
          return res
            .status(400)
            .json({ msg: `El ${req.body.roles[i]} no existe` });
      }
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: err.msg });
  }
};

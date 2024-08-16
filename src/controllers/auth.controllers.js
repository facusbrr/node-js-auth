import {
  createUser,
  assignRolesToUser,
  assignDefaultRoleToUser,
  findUserByUsername,
  comparePassword,
  generateToken,
} from '../helpers/auth.helper.js';

export const signup = async (req, res) => {
  try {
    const user = await createUser(req.body);

    if (req.body.roles) {
      await assignRolesToUser(user, req.body.roles);
    } else {
      await assignDefaultRoleToUser(user);
    }

    res.send({ message: 'User was registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await findUserByUsername(req.body.username);

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = comparePassword(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      });
    }

    const token = generateToken(user.id);

    const authorities = user.roles.map(
      (role) => 'ROLE_' + role.name.toUpperCase()
    );

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

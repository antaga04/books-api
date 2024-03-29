const { signToken } = require('../../config/jwt');
const { hashPassword, verifyPassword } = require('../../config/password');
const { User } = require('../../api/model/mongo');

const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);

    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated) {
      return res.status(400).json('Ese usuario ya existe');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(newUser.password)) {
      return res.status(400).json({
        error:
          'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit',
      });
    }

    const hash = await hashPassword(newUser.password);
    newUser.password = hash;
    newUser.rol = 'user';

    const user = await newUser.save();
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.status(401).json({ data: `User doesn't exist` });
      return;
    }

    const validPassword = await verifyPassword(password, user.password);

    if (!validPassword) {
      res.status(401).json({ data: `Incorrect email or password` });
      return;
    }

    const token = signToken({ id: user._id });
    const { password: unusedPassword, ...restUser } = user;
    res.status(200).json({ data: { token, user: restUser } });
  } catch (err) {
    res.status(400).json({ error: 'Error login' });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { path } = req.file;
    const { id } = req.user;

    await User.updateOne({ _id: id }, { avatar: path });

    res.status(201).json({ data: path });
  } catch (err) {
    res.status(400).json({ error: 'Error updating user avatar' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const newUser = new User(req.body);

    const oldUser = await User.findById(id);
    newUser._id = id;

    newUser.rol = 'user';

    if (oldUser.rol === 'admin') {
      newUser.rol = oldUser.rol;
    }

    newUser.favourites = [...oldUser.favourites, ...newUser.favourites];

    const user = await User.findByIdAndUpdate(id, newUser, { new: true });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(400).json({ error: 'Error updating user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserAvatar,
  updateUser,
};

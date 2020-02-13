const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");
const validateRegisterInput = require("../validations/register");
const validateLoginInput = require("../validations/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();
    const token = jwt.sign(
      {
        id: user._id
      },
      keys.secretOrKey
    );

    return {
      token,
      id: user._id,
      loggedIn: true,
      ...user._doc,
      password: null
    };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const { id } = data;
    const user = User.findById(id);
    return {
      token: "",
      loggedIn: false,
      ...user._doc
    };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    const user = await User.findOne({ email: data.email }).lean();

    const { email, password } = data;
    if (!user) {
      throw new Error("User does not exist!");
    } else {
      const pass = bcrypt.compareSync(data.password, user.password);
      if (pass) {
        const token = jwt.sign(
          {
            id: user._id
          },
          keys.secretOrKey
        );
        return {
          token,
          id: user._id,
          loggedIn: true,
          ...user,
          password: ""
        };
      } else {
        throw new Error("Login credentials are incorrect!");
      }
    }
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return {
      loggedIn,
      id
    };
  } catch (err) {
    return {
      loggedIn: false
    };
  }
};

module.exports = { register, logout, login, verifyUser };

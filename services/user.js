const jwt = require("jsonwebtoken");
const moment = require("moment");
const { models } = require("../models");
const secret = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";
const userRepository = require("../repositories/user");
const addressRepository = require("../repositories/address");

const userService = () => {
  const issueToken = (payload) => jwt.sign(payload, secret, { expiresIn: "7d" });
  const verifyToken = (token, cb) => jwt.verify(token, secret, {}, cb);

  const create = async (data) => {
    // First check if the user with the email alreay exists or not
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already taken");
    }
    //Hash the password and replace with the plain one before storing
    const hashedPassword = await models.user.generatePasswordHash(
      data.password
    );
    data.password = hashedPassword;

    data.lastLogin = moment.utc().toDate();

    const user = await userRepository.create(data);

    // remove users password
    user.password = null;

    const token = issueToken({ _id: user._id });

    console.log("Signup user: ", user);

    return { user: user, token: token };
  }

  const update = async (data) => {
    // First check if the user with the email alreay exists or not
    const existingUser = await userRepository.findById(data._id);
    if (!existingUser) {
      throw new Error("User not found.");
    }

    const user = userRepository.update(data);

    // remove users password
    user.password = null;
    user.following = [];
    user.followers = [];

    console.log("Updated user: ", user);

    return user;
  }

  const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      // We shouldn't specify which information is incorrect
      throw new Error("Email/Password is incorrect");
    }
    const isValidPass = await user.validatePassword(password);
    if (!isValidPass) {
      throw new Error("Email/Password is incorrect");
    }

    // Set lastLogin timestamp
    user.lastLogin = moment.utc().toDate();
    await user.save();
    console.log('Login user: ', user)
    // remove users password
    user.password = null;
    user.following = [];
    user.followers = [];

    const token = issueToken({ _id: user._id });

    return { user: user, token: token };
  }

  const remove = async (_id) => {
    // First check if the user with the id alreay exists or not
    const existingUser = await userRepository.findById(_id);
    if (!existingUser) {
      throw new Error("User not found.");
    }

    const address = await addressRepository.remove(existingUser.address);
    const user = await userRepository.remove(_id);

    return user;
  };
  
  const follow = async (userId, followUserId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const result = await userRepository.follow(userId, followUserId);

    return result;
  };
  
  const nearby = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const result = await userRepository.nearby(userId);

    return result;
  };

  return {
    issueToken,
    verifyToken,
    create,
    update,
    remove,
    login,
    follow,
    nearby,
  };
};

module.exports = userService();

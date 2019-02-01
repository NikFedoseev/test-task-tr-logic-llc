const config = require('../config.json');
const database = require('../helpers/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = database.User;

async function authenticate (param) {
  const user = await User.findOne({ username: param.username });
  if (user && bcrypt.compareSync(param.password, user.password) ) {
    const token = jwt.sign({ id: user._id}, config.secret)
    return token;
  }
};

async function register (param) {
  if (await User.findOne({ username: param.username })) {
    throw `Username ${param.username} already registered`;
  } 
  else if (await User.findOne({ email: param.email })) {
    throw `Email ${param.email} already registered`;
  }
  const user = new User(param);
  
  user.password = bcrypt.hashSync(param.password, 10);
  await user.save();

}

async function getById (id) {
  return await User.findOne({_id: id});
}

module.exports = {
  authenticate,
  register,
  getById
}


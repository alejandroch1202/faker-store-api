const Joi = require('joi');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(20);
const email = Joi.string().email();
const password = Joi.string().min(4).max(20);
const role = Joi.string().valid('admin','customer');
const avatar = Joi.string().uri();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
  avatar: avatar.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  avatar: avatar,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};

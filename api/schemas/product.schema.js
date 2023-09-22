const Joi = require('joi');

const id = Joi.number().integer().min(1);
const title = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(5).max(50);
const image = Joi.array().items(Joi.string().uri())

const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
});

const updateProductSchema = Joi.object({
  title: title,
  price: price,
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};

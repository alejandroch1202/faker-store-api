const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};

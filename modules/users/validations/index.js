const Joi = require("joi");

exports.validateCreatedProduction = function (data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    sizes: Joi.array().items(Joi.number().required()).required(),
    price: Joi.number().min(0).required(),
    discountPrice: Joi.number(),
    colors: Joi.array().items(Joi.string().trim().required()).required(),
    description: Joi.string().trim(),
    images: Joi.array().items(Joi.string().trim()).required(),
    manufacturer: Joi.string().trim(),
    materialComposition: Joi.string().trim(),
    discountPercentage: Joi.number(),
  });
  return schema.validate(data);
};

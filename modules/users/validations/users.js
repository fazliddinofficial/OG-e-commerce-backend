const Joi = require("joi");

exports.validateCreatedUser = function (data) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().required(),
    email: Joi.string().trim(),
    password: Joi.string().required(),
    number: Joi.string().required(),
    favourites: Joi.array().items(Joi.string()),
  });
  return schema.validate(data);
};

const Joi = require("joi");

exports.validateOrderedItems = function (data) {
  const schema = Joi.object({
    orderedBy: Joi.link("#User"),
    itemName: Joi.link("#Product"),
    totalAmount: Joi.number(),
    canceled: Joi.boolean(),
  });
  return schema.validate(data);
};

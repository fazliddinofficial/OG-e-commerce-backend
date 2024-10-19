const Joi = require("joi");

exports.validateOrderedItems = function (data) {
  const schema = Joi.object({
    orderedBy: Joi.link().ref("#User"),
  });
};

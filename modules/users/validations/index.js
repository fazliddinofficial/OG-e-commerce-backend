const Joi = require("joi")

exports.validateCreatedProduction = function (data) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required()
    })

    return schema.validate(data)
}
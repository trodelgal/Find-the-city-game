const Joi = require('joi');

const addClassValidation = data => {
    const schema = Joi.object({
        school: Joi.string().min(2).required(),
        class: Joi.string().min(2).max(4).required(),
        password: '123456123456',
      })
      return schema.validateAsync(data)
    }

module.exports.addClassValidation = addClassValidation;
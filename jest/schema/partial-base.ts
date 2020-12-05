import Joi from 'joi'

export const partialBase = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required()
})

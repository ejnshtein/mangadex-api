import Joi from 'joi'
import { PartialTag, Tag } from '../../types/mangadex'

export const partialTagSchema = Joi.object<PartialTag>({
  id: Joi.number().required(),
  name: Joi.string().required()
})

export const tagSchema = Joi.object<Tag>({
  id: Joi.number().required(),
  name: Joi.string().required(),
  group: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
})

export const tagsSchema = Joi.array().items(tagSchema.required())

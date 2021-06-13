import Joi from 'joi'
import { TagAttributes } from '../../types/data-types/tag'
import { apiBase, apiResponse, translatedFieldSchema } from './base'

export const tagAttributesSchema = Joi.object<
  TagAttributes & { createdAt?: string; updatedAt?: string }
>({
  name: translatedFieldSchema.required(),
  description: Joi.array().items(translatedFieldSchema).required(),
  group: Joi.string().required(),
  version: Joi.number().required(),
  createdAt: Joi.string(),
  updatedAt: Joi.string()
})

export const tagSchema = apiBase('tag', tagAttributesSchema.required())

export const tagResponseSchema = apiResponse({
  data: tagSchema
})

export const tagsSchema = Joi.array().items(tagSchema.required())

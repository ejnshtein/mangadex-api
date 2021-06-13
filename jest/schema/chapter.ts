import Joi from 'joi'
import { ChapterAttributesExtended } from '../../types/data-types/chapter'
import { apiBase, apiResponse } from './base'

export const chapterAttributesSchema = Joi.object<ChapterAttributesExtended>({
  title: Joi.string().allow('').required(),
  volume: Joi.string().required(),
  chapter: Joi.string().required(),
  translatedLanguage: Joi.string().required(),
  hash: Joi.string().required(),
  data: Joi.array().items(Joi.string().required()).required(),
  dataSaver: Joi.array().items(Joi.string().required()).required(),
  createdAt: Joi.string().required(),
  publishAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  version: Joi.number().required()
})

export const chapterSchema = apiBase(
  'chapter',
  chapterAttributesSchema.required()
)

export const chapterResponseSchema = apiResponse({
  data: chapterSchema.required()
})

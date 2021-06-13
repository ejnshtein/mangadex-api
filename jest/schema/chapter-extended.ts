import Joi from 'joi'
import { apiBase, apiResponse } from './base'
import { chapterAttributesSchema } from './chapter'
import { groupResponseSchema } from './group'
import { mangaResponseSchema } from './manga'
import { userResponseSchema } from './user'

export const chapterAttributesExtendedSchema = chapterAttributesSchema.keys({
  scanlation_group: Joi.array().items(groupResponseSchema).required(),
  manga: mangaResponseSchema.required(),
  uploader: userResponseSchema.required()
})

export const chapterExtendedSchema = apiBase(
  'chapter',
  chapterAttributesExtendedSchema.required()
)

export const chapterResponseExtendedSchema = apiResponse({
  data: chapterExtendedSchema.required()
})

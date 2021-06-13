import Joi from 'joi'
import { apiBase, apiResponse } from './base'
import { coverArtResponseSchema } from './cover-art'
import { mangaAttributesSchema } from './manga'
import { userResponseSchema } from './user'

export const mangaAttributesExtendedSchema = mangaAttributesSchema.keys({
  artist: Joi.array().items(userResponseSchema.required()),
  author: userResponseSchema,
  cover_art: Joi.array().items(coverArtResponseSchema.required())
})

export const mangaExtendedSchema = apiBase(
  'manga',
  mangaAttributesExtendedSchema.required()
)

export const mangaResponseExtendedSchema = apiResponse({
  data: mangaExtendedSchema.required()
})

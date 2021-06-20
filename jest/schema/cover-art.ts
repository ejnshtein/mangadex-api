import Joi from 'joi'
import { CoverArtAttributesExtended } from '../../types/data-types/cover-art'
import { apiBase, apiResponse, apiResponseList } from './base'

export const coverAttributesSchema = Joi.object<CoverArtAttributesExtended>({
  description: Joi.string().allow('').required(),
  volume: Joi.string().allow(null).required(),
  fileName: Joi.string().required(),
  urls: Joi.array().items(Joi.string().required()).required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  version: Joi.number().required()
})

export const coverArtSchema = apiBase(
  'cover_art',
  coverAttributesSchema.required()
)

export const coverArtResponseSchema = apiResponse({
  data: coverArtSchema
})

export const coverArtsResponseSchema = apiResponseList({
  data: coverArtSchema
})

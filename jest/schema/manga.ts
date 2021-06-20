import Joi from 'joi'
import { MangaAttributesExtended } from '../../types/data-types/manga'
import { Links, MangaLink } from '../../types/data-types/manga-link'
import {
  apiBase,
  apiResponse,
  apiResponseList,
  translatedFieldSchema
} from './base'
import { chapterSchema } from './chapter'
import { tagSchema } from './tag'

export const mangaPublicationDemographicSchema = Joi.string().valid(
  'shounen',
  'shoujo',
  'josei',
  'seinen'
)

export const mangaStatusSchema = Joi.string().valid(
  'ongoing',
  'completed',
  'hiatus',
  'cancelled'
)

export const mangaRatingContentSchema = Joi.string().valid(
  'safe',
  'suggestive',
  'erotica',
  'pornographic'
)

export const linkKeys: MangaLink[] = [
  'al',
  'amz',
  'ap',
  'bw',
  'cdj',
  'ebj',
  'engtl',
  'kt',
  'mal',
  'mu',
  'nu',
  'raw'
]

export const mangaLinkSchema = Joi.object<Links>(
  linkKeys.reduce(
    (acc, val) => ({
      ...acc,
      [val]: Joi.string()
    }),
    {}
  )
)

export const mangaAttributesSchema = Joi.object<MangaAttributesExtended>({
  title: translatedFieldSchema.required(),
  altTitles: Joi.array().items(translatedFieldSchema.required()).required(),
  description: translatedFieldSchema.required(),
  isLocked: Joi.boolean(),
  originalLanguage: Joi.string().required(),
  links: mangaLinkSchema.required(),
  lastVolume: Joi.string().allow(null, '').required(),
  lastChapter: Joi.string().allow(null, '').required(),
  publicationDemographic: mangaPublicationDemographicSchema.required(),
  status: mangaStatusSchema.required(),
  year: Joi.number().allow(null).required(),
  contentRating: mangaRatingContentSchema.allow(null).required(),
  tags: Joi.array().items(tagSchema.required()).required(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
  version: Joi.number()
})

export const mangaSchema = apiBase('manga', mangaAttributesSchema.required())

export const mangaResponseSchema = apiResponse({
  data: mangaSchema.required()
})

export const mangaFeedSchema = apiResponseList({
  data: chapterSchema.required()
})

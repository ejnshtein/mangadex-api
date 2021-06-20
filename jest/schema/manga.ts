import Joi from 'joi'
import {
  MangaAttributesExtended,
  MangaChapter,
  MangaVolume
} from '../../types/data-types/manga'
import { Links, MangaLink } from '../../types/data-types/manga-link'
import { TagAttributes } from '../../types/data-types/tag'
import {
  apiBase,
  apiResponse,
  apiResponseList,
  translatedFieldSchema
} from './base'
import { chapterSchema } from './chapter'

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

export const tagResponseSchema = Joi.array().items(
  apiResponse({
    data: tagSchema
  })
)

export const tagsSchema = Joi.array().items(tagSchema.required())

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

export const mangaChapterSchema = Joi.object<MangaChapter>({
  chapter: Joi.string().required(),
  count: Joi.number().required()
})

export const mangaVolumeSchema = Joi.object<MangaVolume>({
  volume: Joi.string().required(),
  count: Joi.number().required(),
  chapters: Joi.object()
    .custom((value) => {
      const chapters = Object.values(value)
      const result = Joi.array().items(mangaChapterSchema).validate(chapters)

      if (result.error) {
        return result.error
      }

      return result.value
    })
    .required()
})

export const mangaVolumesSchema = Joi.object().custom((value) => {
  const volumes = Object.values(value)

  const result = Joi.array().items(mangaVolumeSchema).validate(volumes)

  if (result.error) {
    return result.error
  }

  return result.value
})

export const mangaVolumesAndChaptersResponse = apiResponse({
  volumes: mangaVolumesSchema.required()
})

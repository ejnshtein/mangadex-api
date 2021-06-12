import Joi from 'joi'
import { TranslatedField } from '../../types/data-types/language'
import {
  MangaAttributes,
  MangaAttributesExtended,
  OptionalMangaAttributes
} from '../../types/data-types/manga'

export const translatedFieldSchema = Joi.defaults(schema => schema.options({ allowUnknown: true })).object<TranslatedField>({
  en: Joi.string().required(),
})

export const mangaPublicationSchema = Joi.object<>({
  demographic: Joi.number().required(),
  language: Joi.string().required(),
  languageName: Joi.string().required(),
  status: Joi.number().required()
})

export const linkSchema = Joi.object<Link>({
  title: Joi.string().required(),
  url: Joi.string().required()
})

export const ratingSchema = Joi.object<MangaRating>({
  bayesian: Joi.number().required(),
  mean: Joi.number().required(),
  users: Joi.number().required()
})

export const relationSchema = Joi.object<RelatedManga>({
  id: Joi.number().required(),
  isHentai: Joi.boolean().required(),
  title: Joi.string().required(),
  type: Joi.number().required()
})

export const partialMangaSchema = Joi.object<PartialManga>({
  id: Joi.number().required(),
  name: Joi.string().allow('').required(),
  title: Joi.string().allow('').required(),
  isHentai: Joi.boolean().required(),
  lastChapter: Joi.string().allow(null),
  lastVolume: Joi.string().allow(null),
  mainCover: Joi.string().required()
})

export const mangaAttributesSchema = Joi.object<
  MangaAttributesExtended<keyof OptionalMangaAttributes>
>({
  altTitles: 
})

export const mangaCoversSchema = Joi.array().items(
  Joi.object({
    url: Joi.string().required(),
    volume: Joi.string().required()
  }).required()
)

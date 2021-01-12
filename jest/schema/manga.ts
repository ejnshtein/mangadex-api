import Joi from 'joi'
import {
  FormattedManga,
  FormattedMangaPublication,
  Link,
  MangaRating,
  PartialManga,
  RelatedManga
} from '../../types/mangadex'

export const mangaPublicationSchema = Joi.object<FormattedMangaPublication>({
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

export const mangaSchema = Joi.object<FormattedManga>({
  altTitles: Joi.array().items(Joi.string().required()),
  artist: Joi.array().items(Joi.string().required()).required(),
  author: Joi.array().items(Joi.string().required()).required(),
  comments: Joi.number().required(),
  description: Joi.string().required(),
  follows: Joi.number().required(),
  id: Joi.number().required(),
  isHentai: Joi.boolean().required(),
  lastChapter: Joi.string().allow(null).required(),
  lastUploaded: Joi.number().required(),
  lastVolume: Joi.string().allow(null).required(),
  links: Joi.array().items(linkSchema).required(),
  mainCover: Joi.string().required(),
  publication: mangaPublicationSchema.required(),
  rating: ratingSchema.required(),
  relations: Joi.array().items(relationSchema).required(),
  tags: Joi.array().items(Joi.number().required()).required(),
  title: Joi.string().required(),
  views: Joi.number().required()
})

export const mangaCoversSchema = Joi.array().items(
  Joi.object({
    url: Joi.string().required(),
    volume: Joi.string().required()
  }).required()
)

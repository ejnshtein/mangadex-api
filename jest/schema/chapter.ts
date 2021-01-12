import Joi from 'joi'
import {
  FormattedChapter,
  PartialChapter,
  PartialChapters
} from '../../types/mangadex'
import { partialBase } from './partial-base'

export const partialChapterSchema = Joi.object<PartialChapter>({
  chapter: Joi.string().allow('').required(),
  comments: Joi.number().required(),
  groups: Joi.array().items(Joi.number().required()).required(),
  hash: Joi.string().required(),
  id: Joi.number().required(),
  language: Joi.string().required(),
  mangaId: Joi.number().required(),
  mangaTitle: Joi.string().allow(null).required(),
  threadId: Joi.number().allow(null).required(),
  timestamp: Joi.number().required(),
  title: Joi.string().allow('').required(),
  uploader: Joi.number().required(),
  views: Joi.number().required(),
  volume: Joi.string().allow(null, '').required()
})

export const partialChaptersSchema = Joi.object<PartialChapters>({
  chapters: Joi.array().items(partialChapterSchema).required(),
  groups: Joi.array().items(partialBase).required()
})

export const chapterSchema = Joi.object<FormattedChapter>({
  chapter: Joi.string().allow('').required(),
  comments: Joi.number().allow(null).required(),
  groups: Joi.array().items(partialBase.required()).required(),
  hash: Joi.string().required(),
  id: Joi.number().required(),
  language: Joi.string().required(),
  mangaId: Joi.number().required(),
  mangaTitle: Joi.string().allow(null).required(),
  pages: Joi.alternatives()
    .try(Joi.array().items(Joi.string().required()), Joi.string())
    .required(),
  server: Joi.string().optional(),
  serverFallback: Joi.string().optional(),
  status: Joi.string().required(),
  threadId: Joi.number().allow(null).required(),
  timestamp: Joi.number().required(),
  title: Joi.string().allow('').required(),
  uploader: Joi.number().required(),
  views: Joi.number().required(),
  volume: Joi.string().allow(null, '').required(),
  fallbackPages: Joi.array()
    .items(Joi.string().required())
    .allow(null)
    .required(),
  languageName: Joi.string().required()
})

import Joi from 'joi'
import {
  ChapterAttributes,
  ChapterAttributesExtended
} from '../../types/data-types/chapter'

export const chapterAttributesSchema = Joi.object<ChapterAttributes>({
  chapter: Joi.string().allow('').required(),
  volume: Joi.string().allow(null).required(),
  title: Joi.string().allow('').required(),
  translatedLanguage: Joi.string().required(),
  hash: Joi.string().required(),
  data: Joi.array().items(Joi.string().required()).required(),
  dataSaver: Joi.array().items(Joi.string().required()).required(),
  version: Joi.number().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required()
})

export const chapterAttributesExtendedSchema =
  Joi.object<ChapterAttributesExtended>({
    chapter: Joi.string().allow('').required(),
    volume: Joi.string().allow(null).required(),
    title: Joi.string().allow('').required(),
    translatedLanguage: Joi.string().required(),
    hash: Joi.string().required(),
    data: Joi.array().items(Joi.string().required()).required(),
    dataSaver: Joi.array().items(Joi.string().required()).required(),
    version: Joi.number().required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().required(),
    manga: MangaSchema.required(),
    scanlation_group: ScanlationGroupSchema.required(),
    uploader: UserSchema.required()
  })

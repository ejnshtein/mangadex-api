import Joi from 'joi'
import {
  FollowType,
  MangadexHome,
  MangadexHomeTopChapter,
  MangadexHomeTopManga,
  MangadexHomeUpdate,
  Relation,
  SearchResult,
  SearchResultTitle
} from '../../types/mangadex'
import { partialBase } from './partial-base'

export const searchResultTitle = Joi.object<SearchResultTitle>({
  id: Joi.number().required(),
  title: Joi.string().required(),
  image_url: Joi.string().required(),
  description: Joi.string().allow('').required(),
  views: Joi.number().required(),
  follows: Joi.number().required(),
  rating: Joi.object()
    .keys({
      value: Joi.number().required(),
      votes: Joi.number().required()
    })
    .required(),
  lang_name: Joi.string().required(),
  is_hentai: Joi.boolean().required()
})

export const searchResultSchema = Joi.object<SearchResult>({
  titles: Joi.array().items(searchResultTitle).required(),
  current_page: Joi.number(),
  last_page: Joi.number()
})

export const homeAnnouncementSchema = Joi.object({
  text: Joi.string().required(),
  url: Joi.string()
})

export const homeUpdateSchema = Joi.object<MangadexHomeUpdate>({
  id: Joi.number().required(),
  chapter: Joi.string().required(),
  title: Joi.string().required(),
  manga_id: Joi.number().required(),
  cover_url: Joi.string().required(),
  group: partialBase.required(),
  uploaded: Joi.string().required()
})

export const homeTopChapterSchema = Joi.object<MangadexHomeTopChapter>({
  id: Joi.number().required(),
  chapter: Joi.string().required(),
  title: Joi.string().required(),
  manga_id: Joi.number().required(),
  cover_url: Joi.string().required(),
  views: Joi.number().required()
})

export const homeTopMangaSchema = Joi.object<MangadexHomeTopManga>({
  id: Joi.number().required(),
  title: Joi.string().required(),
  cover_url: Joi.string().required(),
  follows: Joi.number().required(),
  rating: Joi.number().required(),
  users: Joi.number().required()
})

export const mangadexHomeSchema = Joi.object<MangadexHome>({
  announcement: homeAnnouncementSchema.allow(null).required(),
  latest_updates: Joi.object({
    all: Joi.array().items(homeUpdateSchema.required()).required(),
    follows: Joi.alternatives([
      Joi.string().required(),
      Joi.array().items(homeUpdateSchema).required()
    ]).required()
  }),
  top_chapters: Joi.object({
    six_hours: Joi.array().items(homeTopChapterSchema.required()).required(),
    day: Joi.array().items(homeTopChapterSchema.required()).required(),
    week: Joi.array().items(homeTopChapterSchema.required()).required()
  }),
  top_manga: Joi.object({
    follows: Joi.array().items(homeTopMangaSchema.required()).required(),
    rating: Joi.array().items(homeTopMangaSchema.required()).required()
  })
})

export const relationsSchema = Joi.array().items(
  Joi.object<Relation>({
    id: Joi.number().required(),
    name: Joi.string().required(),
    pairId: Joi.number().required()
  }).required()
)

export const followsSchema = Joi.array().items(
  Joi.object<FollowType>({
    id: Joi.number().required(),
    name: Joi.string().required()
  }).required()
)

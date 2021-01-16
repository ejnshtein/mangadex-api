import Joi from 'joi'
import {
  FollowedPartialChapter,
  FollowedUpdates,
  User,
  UserManga,
  UserMangaRating,
  UserSettings
} from '../../types/mangadex'
import { partialMangaSchema } from './manga'
import { partialBase } from './partial-base'

export const userSchema = Joi.object<User>({
  avatar: Joi.string().allow(null).required(),
  biography: Joi.string().allow('').required(),
  id: Joi.number().required(),
  joined: Joi.number().required(),
  lastSeen: Joi.number().required(),
  levelId: Joi.number().required(),
  mdAtHome: Joi.number().required(),
  premium: Joi.boolean().required(),
  uploads: Joi.number().required(),
  username: Joi.string().required(),
  views: Joi.number().required(),
  website: Joi.string().allow('').required()
})

export const userFollowedPartialChapterSchema = Joi.object<FollowedPartialChapter>(
  {
    chapter: Joi.string().allow('').required(),
    comments: Joi.number().required(),
    groups: Joi.array().items(Joi.number().required()).required(),
    hash: Joi.string().required(),
    id: Joi.number().required(),
    language: Joi.string().required(),
    mangaId: Joi.number().required(),
    mangaTitle: Joi.string().allow(null).required(),
    read: Joi.boolean().required(),
    threadId: Joi.number().allow(null).required(),
    timestamp: Joi.number().required(),
    title: Joi.string().allow('').required(),
    uploader: Joi.number().required(),
    views: Joi.number().required(),
    volume: Joi.string().allow(null, '').required()
  }
)

export const userMangaSchema = Joi.object<UserManga>({
  chapter: Joi.string().allow('').required(),
  followType: Joi.number().required(),
  mangaId: Joi.number().required(),
  mangaTitle: Joi.string().allow(null, '').required(),
  mainCover: Joi.string().allow(null, '').required(),
  rating: Joi.number().allow(null).required(),
  userId: Joi.number().required(),
  isHentai: Joi.boolean().required(),
  volume: Joi.string().allow(null, '').required()
})

export const userFollowedPartialMangaSchema = Joi.array().items(
  userMangaSchema.required()
)

export const userFollowedUpdatesSchema = Joi.object<FollowedUpdates>({
  chapters: Joi.array().items(userFollowedPartialChapterSchema).required(),
  groups: Joi.array().items(partialBase).required(),
  manga: Joi.array().items(partialMangaSchema).required()
})

export const userMangaRatingSchema = Joi.array().items(
  Joi.object<UserMangaRating>({
    mangaId: Joi.number().required(),
    rating: Joi.number().allow(null).required()
  })
)

export const userSettingsSchema = Joi.object<UserSettings>({
  excludedTags: Joi.array()
    .items(Joi.object({ id: Joi.number().required() }))
    .required(),
  hentaiMode: Joi.number().required(),
  id: Joi.number().required(),
  latestUpdates: Joi.number().required(),
  showModeratedPosts: Joi.boolean().required(),
  showUnavailableChapters: Joi.boolean().required(),
  shownChapterLangs: Joi.array()
    .items(Joi.object({ id: Joi.string().allow('').required() }))
    .required()
})

import Joi from 'joi'
import {
  FollowedPartialManga,
  FollowedUpdates,
  User,
  UserManga,
  UserMangaRating,
  UserSettings
} from '../../types/mangadex'
import { partialMangaSchema } from './manga'
import { partialChapterSchema } from './chapter'
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

export const userFollowedPartialMangaSchema = Joi.array().items(
  Joi.object<FollowedPartialManga>({
    chapter: Joi.string().allow('').required(),
    followType: Joi.number().required(),
    mangaId: Joi.number().required(),
    mangaTitle: Joi.string().allow(null, '').required(),
    rating: Joi.number().allow(null).required(),
    userId: Joi.number().required(),
    volume: Joi.string().allow(null, '').required()
  })
)

export const userFollowedUpdatesSchema = Joi.object<FollowedUpdates>({
  chapters: Joi.array().items(partialChapterSchema).required(),
  groups: Joi.array().items(partialBase).required(),
  manga: Joi.array().items(partialMangaSchema).required()
})

export const userMangaSchema = Joi.object<UserManga>({
  chapter: Joi.string().allow('').required(),
  followType: Joi.number().required(),
  mangaId: Joi.number().required(),
  mangaTitle: Joi.string().allow(null, '').required(),
  rating: Joi.number().allow(null).required(),
  userId: Joi.number().required(),
  volume: Joi.string().allow(null, '').required()
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

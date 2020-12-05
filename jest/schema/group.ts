import Joi from 'joi'
import { Group } from '../../types/mangadex'
import { partialBase } from './partial-base'

export const groupSchema = Joi.object<Group>({
  id: Joi.number().required(),
  name: Joi.string().required(),
  altNames: Joi.string().allow('').required(),
  banner: Joi.string().allow(null).required(),
  chapters: Joi.number().required(),
  delay: Joi.number().required(),
  description: Joi.string().allow('').required(),
  discord: Joi.string().allow('').required(),
  email: Joi.string().allow('').email().required(),
  follows: Joi.number().required(),
  founded: Joi.string().required(),
  ircChannel: Joi.string().allow('').required(),
  ircServer: Joi.string().allow('').required(),
  isInactive: Joi.boolean().required(),
  isLocked: Joi.boolean().required(),
  language: Joi.string().required(),
  lastUpdated: Joi.number().required(),
  leader: partialBase.required(),
  likes: Joi.number().required(),
  members: Joi.array().items(partialBase).required(),
  threadId: Joi.number().required(),
  threadPosts: Joi.number().required(),
  views: Joi.number().required(),
  website: Joi.string().allow('').required()
})

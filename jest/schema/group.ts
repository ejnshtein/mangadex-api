import Joi from 'joi'
import { GroupAttributesExtended } from '../../types/data-types/group'
import { apiBase, apiResponse } from './base'
import { userSchema } from './user'

export const groupAttributesSchema = Joi.object<GroupAttributesExtended>({
  name: Joi.string().required(),
  leader: userSchema.required(),
  members: Joi.array().items(userSchema).required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  version: Joi.number().required()
})

export const groupSchema = apiBase(
  'scanlation_group',
  groupAttributesSchema.required()
)

export const groupResponseSchema = apiResponse({
  data: groupSchema.required()
})

// export const groupSchema = Joi.object<Group>({
//   id: Joi.number().required(),
//   name: Joi.string().required(),
//   altNames: Joi.string().allow('').required(),
//   banner: Joi.string().allow(null).required(),
//   chapters: Joi.number().required(),
//   delay: Joi.number().required(),
//   description: Joi.string().allow('').required(),
//   discord: Joi.string().allow('').required(),
//   email: Joi.string().allow('').email().required(),
//   follows: Joi.number().required(),
//   founded: Joi.string().required(),
//   ircChannel: Joi.string().allow('').required(),
//   ircServer: Joi.string().allow('').required(),
//   isInactive: Joi.boolean().required(),
//   isLocked: Joi.boolean().required(),
//   language: Joi.string().required(),
//   lastUpdated: Joi.number().required(),
//   leader: partialBase.required(),
//   likes: Joi.number().required(),
//   members: Joi.array().items(partialBase).required(),
//   threadId: Joi.number().required(),
//   threadPosts: Joi.number().required(),
//   views: Joi.number().required(),
//   website: Joi.string().allow('').required()
// })

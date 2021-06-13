import Joi from 'joi'
import { RelationshipType } from '../../types/data-types/relationship'

export const relationshipTypes: RelationshipType[] = [
  'artist',
  'author',
  'chapter',
  'cover_art',
  'custom_list',
  'manga',
  'user',
  'tag',
  'scanlation_group'
]

export const relationshipSchema = Joi.object({
  id: Joi.string().required(),
  type: Joi.string()
    .valid(...relationshipTypes)
    .required()
})

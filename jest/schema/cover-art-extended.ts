import { apiBase, apiResponse } from './base'
import { coverAttributesSchema } from './cover-art'
import { mangaSchema } from './manga'
import { userSchema } from './user'

export const coverAttributesExtendedSchema = coverAttributesSchema.keys({
  manga: mangaSchema,
  uploader: userSchema
})

export const coverArtExtendedSchema = apiBase(
  'cover_art',
  coverAttributesExtendedSchema.required()
)

export const coverArtExtendedResponseSchema = apiResponse({
  data: coverArtExtendedSchema
})

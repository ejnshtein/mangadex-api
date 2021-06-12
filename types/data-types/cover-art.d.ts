import { Manga } from './manga'
import { User } from './user'
import { ApiBase } from '../api'
import { AttributeBase } from '../base'
import { SuccessfulResponse } from '../response'

export interface OptionalCoverArtAttributes {
  manga?: Manga
  uploader?: User
}

export interface CoverArtAttributes extends AttributeBase {
  description?: string
  volume?: string
  fileName: string
  urls: string[]
}

export type CoverArtAttributesExtended = CoverArtAttributes &
  OptionalCoverArtAttributes

export type CoverArt = ApiBase<'cover_art', CoverArtAttributes>
export type CoverArtResponse = SuccessfulResponse<{
  data: CoverArt
}>

export type CoverArtExtended = ApiBase<'cover_art', CoverArtAttributesExtended>
export type CoverArtExtendedResponse = SuccessfulResponse<{
  data: CoverArtExtended
}>

export type CoverArtsResponse = SuccessfulResponse<{ data: CoverArt }>

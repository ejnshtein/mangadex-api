import { MangaResponse } from './manga'
import { UserResponse } from './user'
import { ApiBase } from '../api'
import { AttributeBase } from '../base'
import { ApiResponse, ApiResponseList } from '../response'

export interface OptionalCoverArtAttributes {
  manga?: MangaResponse
  uploader?: UserResponse
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
export type CoverArtResponse = ApiResponse<{
  data: CoverArt
}>

export type CoverArtExtended = ApiBase<'cover_art', CoverArtAttributesExtended>
export type CoverArtExtendedResponse = ApiResponse<{
  data: CoverArtExtended
}>

export type CoverArtsResponse = ApiResponseList<{ data: CoverArt }>

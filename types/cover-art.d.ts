import { ApiBase, ApiResponseWithRelationships } from './api'
import { AttributeBase } from './base'
import { Manga } from './manga'
import { ApiResponse } from './response'
import { User } from './user'

export interface CoverArtAttributes extends AttributeBase {
  description?: string
  volume?: string
}

export type CoverArt = ApiBase<'cover_art', CoverArtAttributes>

export type CoverArtResponse<W extends boolean = false> =
  ApiResponseWithRelationships<
    W,
    {
      cover_art: CoverArt
    },
    {
      manga?: Manga[]
      user?: User[]
    }
  >

export type CoverArtsResponse = ApiResponse<CoverArt>

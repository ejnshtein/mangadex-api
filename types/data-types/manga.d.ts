import { AttributeBase } from '../base'
import { Language, TranslatedField } from './language'
import { MangaPublicationDemographic } from './manga-publication-demographic'
import { MangaStatus } from './manga-status'
import { Links } from './manga-link'
import { Tag } from './tag'
import { ApiBase } from '../api'
import { UserResponse } from './user'
import { CoverArtResponse } from './cover-art'
import { ApiResponse, ApiResponseList } from '../response'
import { Chapter } from './chapter'

export type MangaReadingStatus =
  | 'reading'
  | 'on_hold'
  | 'plan_to_read'
  | 'dropped'
  | 're_reading'
  | 'completed'

export type MangaRatingContent =
  | 'safe'
  | 'suggestive'
  | 'erotica'
  | 'pornographic'

export interface OptionalMangaAttributes {
  author?: UserResponse
  artist?: UserResponse[]
  cover_art?: CoverArtResponse[]
}

export interface MangaAttributes extends AttributeBase {
  title: TranslatedField
  altTitles: TranslatedField[]
  description: TranslatedField
  isLocked: boolean
  links: Links
  originalLanguage: Language
  lastVolume?: string
  lastChapter?: string
  publicationDemographic?: MangaPublicationDemographic
  status?: MangaStatus
  /**
   * Year of release
   */
  year?: number
  contentRating?: MangaRatingContent
  tags: Tag[]
}

export type MangaAttributesExtended = MangaAttributes & OptionalMangaAttributes

export type Manga = ApiBase<'manga', MangaAttributes>
export type MangaResponse = ApiResponse<{ data: Manga }>

export type MangaExtended = ApiBase<'manga', MangaAttributesExtended>
export type MangaExtendedResponse = ApiResponse<{
  data: MangaExtended
}>

export type MangaList = ApiResponseList<{ data: Manga }>

export type MangaFeedResponse = ApiResponseList<{
  data: Chapter
}>

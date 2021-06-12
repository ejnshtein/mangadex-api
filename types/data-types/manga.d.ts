import { AttributeBase } from '../base'
import { Language, TranslatedField } from './language'
import { MangaPublicationDemographic } from './manga-publication-demographic'
import { MangaStatus } from './manga-status'
import { Links } from './manga-link'
import { Tag } from './tag'
import { ApiBase } from '../api'
import { User } from './user'
import { CoverArt } from './cover-art'
import { ApiResponseList, SuccessfulResponse } from '../response'
import { Chapter } from './chapter'

export interface OptionalMangaAttributes {
  author?: User
  artist?: User[]
  cover_art?: CoverArt[]
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
  contentRating?: string
  tags: Tag[]
}

export type MangaAttributesExtended = MangaAttributes & OptionalMangaAttributes

export type Manga = ApiBase<'manga', MangaAttributes>
export type MangaResponse = SuccessfulResponse<{ data: Manga }>

export type MangaExtended = ApiBase<'manga', MangaAttributesExtended>
export type MangaExtendedResponse = SuccessfulResponse<{
  data: MangaExtended
}>

export type MangaList = ApiResponseList<{ data: Manga }>

export type MangaFeedResponse = ApiResponseList<{ data: Chapter }>

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

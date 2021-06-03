import { AttributeBase } from './base'
import { Language, TranslatedField } from './language'
import { MangaPublicationDemographic } from './manga-publication-demographic'
import { MangaStatus } from './manga-status'
import { Links } from './manga-link'
import { Tag } from './tag'
import { ApiBase, ApiResponseWithRelationships } from './api'
import { User } from './user'
import { CoverArt } from './cover-art'
import { ApiResponse } from './response'
import { Chapter } from './chapter'

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

export type Manga = ApiBase<'manga', MangaAttributes>

export type MangaResponse<W extends boolean = false> =
  ApiResponseWithRelationships<
    W,
    {
      manga: Manga
    },
    {
      author?: User[]
      artist?: User[]
      cover_art?: CoverArt[]
    }
  >

export type MangaFeedResponse = ApiResponse<Chapter>

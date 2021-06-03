import { ApiBase, ApiResponseWithRelationships } from './api'
import { AttributeBase } from './base'
import { Manga } from './manga'
import { Group } from './group'
import { User } from './user'

export interface ChapterAttributes extends AttributeBase {
  title: string
  volume: string
  chapter: string
  translatedLanguage: string
  hash: string
  data: string[]
  dataSaver: string[]
  uploader: string
}

export type Chapter = ApiBase<'chapter', ChapterAttributes>

export type ChapterResponse<W extends boolean = false> =
  ApiResponseWithRelationships<
    W,
    {
      chapter: Chapter
    },
    {
      scanlation_group?: Group[]
      manga?: Manga
      user?: User
    }
  >

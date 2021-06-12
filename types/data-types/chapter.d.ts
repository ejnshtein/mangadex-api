import { ApiBase } from '../api'
import { AttributeBase } from '../base'
import { Manga } from './manga'
import { Group } from './group'
import { User } from './user'
import { ApiResponseList, SuccessfulResponse } from '../response'

export interface OptionalChapterAttributes {
  scanlation_group?: Group[]
  manga?: Manga
  uploader?: User
}

export interface ChapterAttributes extends AttributeBase {
  title: string
  volume: string
  chapter: string
  translatedLanguage: string
  hash: string
  data: string[]
  dataSaver: string[]
}

export type ChapterAttributesExtended = ChapterAttributes &
  OptionalChapterAttributes

export type Chapter = ApiBase<'chapter', ChapterAttributes>

export type ChapterResponse = SuccessfulResponse<{
  data: Chapter
}>

export type ChapterExtended = ApiBase<'chapter', ChapterAttributesExtended>

export type ChapterExtendedResponse = SuccessfulResponse<{
  data: ChapterExtended
}>

export type ChapterList = ApiResponseList<{ data: Chapter }>

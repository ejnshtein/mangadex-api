import { ApiBase } from '../api'
import { AttributeBase } from '../base'
import { MangaResponse } from './manga'
import { GroupResponse } from './group'
import { UserResponse } from './user'
import { ApiResponseList, ApiResponse } from '../response'

export interface OptionalChapterAttributes {
  scanlation_group?: GroupResponse[]
  manga?: MangaResponse
  uploader?: UserResponse
}

export interface ChapterAttributes extends AttributeBase {
  title: string
  volume: string
  chapter: string
  translatedLanguage: string
  hash: string
  data: string[]
  dataSaver: string[]
  publishAt: string
}

export type ChapterAttributesExtended = ChapterAttributes &
  OptionalChapterAttributes

export type Chapter = ApiBase<'chapter', ChapterAttributes>

export type ChapterResponse = ApiResponse<{
  data: Chapter
}>

export type ChapterExtended = ApiBase<'chapter', ChapterAttributesExtended>

export type ChapterExtendedResponse = ApiResponse<{
  data: ChapterExtended
}>

export type ChapterList = ApiResponseList<{ data: Chapter }>

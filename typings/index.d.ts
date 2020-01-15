import * as md from './mangadex.d'
import * as request from './request.d'

export const Mangadex: MangadexConstructor


export interface Mangadex extends Composer {

  /**
   * 
   * @param mangaId Mangadex manga id
   * @param normalize Will transform some manga object properties. [Details](#Manga-normalize-example)
   * @param params [github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)
   */
  getManga (
    mangaId: string | number,
    normalize?: Boolean,
    params?: request.RequestOptions
  ): Promise<md.Title>

  /**
   * 
   * @param chapterId Mangedex chapter id
   * @param normalize Will transform some manga object properties. [Details](#Chapter-normalize-example)
   * @param params [github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)
   */
  getChapter (
    chapterId: string | number,
    normalize?: boolean,
    params?: request.RequestOptions
  ):Promise<md.Chapter>

  /**
   * 
   * @param query Query string for searching on [mangadex](https://mangadex.org/search)
   * @param searchSegment Will specify search request segment . There are 3 segments to search: `title`, `artist` and `author`. By default used `title` segment, because basically people search manga by this parameter.
   * @param params [github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)
   */
  search (
    query?: SearchQuery,
    params?: request.RequestOptions
  ): Promise<md.SearchResult>
}

export interface SearchQuery {

  /**
   * Manga title
   */
  title: String

  /**
   * Author
   */
  author: String

  /**
   * Artist
   */
  artist: String

  /**
   * Original Language
   */
  lang_id: md.OriginalLanguage

  /**
   * Demographic
   */
  demos: md.Demographic

  /**
   * Publication status
   */
  statuses: md.PublicationStatus

  /**
   * Tags
   */
  tags: md.Tags

  /**
   * Tag inclusion mode
   */
  tag_mode_inc_all: 'all' | 'any'

  /**
   * Tag exclusion mode
   */
  tag_mode_exc: 'all' | 'any'
}

export interface Composer {

  getGenres (genre: number | string): Array<{ id: number, label: string }>

  getMangaLinks (links: Map<string, string>): Array<{ title: string, url: string }>

  getStatus (status: number): string

  getLangName (landCode: string): string

}

export interface MangadexOptions {

  /**
   * Default cache timeout for both manga and chapter data. (ms)
   */
  cacheTimeout: number

  /**
   * Default cache timeout for manga data. (ms)
   */
  mangaCacheTimeout: number

  /**
   * Default cache timeout for chapter data. (ms)
   */
  chapterCacheTimeout: number

  /**
   * Set `true` if you want to use caching for manga data.
   */
  cacheMangaResult: boolean

  /**
   * Set `true` if you want to use caching for chapter data.
   */
  cacheChapterResult: boolean
  
  /**
   * If `true` will use shared manga in-memory store instead of Mangadex instance cache store. (Works with timeout **mangaCacheTimeout** option)
   */
  shareMangaCache: boolean

  /**
   * If `true` will use shared chapter in-memory store instead of Mangadex instance cache store. (Works with timeout **chapterCacheTimeout** option)
   */
  shareChapterCache: boolean
}

export interface MangadexConstructor {
  /**
   * Initialize new Mangadex app.
   */
  new (options: MangadexOptions): Mangadex
}

export default Mangadex
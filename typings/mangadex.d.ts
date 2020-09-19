export interface MangaRating {
  /**
   * Bayesian rating
   * @description https://en.wikipedia.org/wiki/Bayesian_average
   */
  bayesian: string

  /**
   * Average rating, the sum of the ratings divided by the number of rating responses
   */
  mean: string

  /**
   * Rated by users count
   */
  users: string
}

export interface MangaRelated {
  /**
   * Is related manga hentai (0 or 1)
   */
  manga_hentai: number

  /**
   * Related manga title
   */
  manga_name: string

  /**
   * Related manga id
   */
  related_manga_id: number

  /**
   * Relation id  
   * 4 - Spin-off  
   * 8 - Doujinshi  
   * 10 - Coloured
   */
  relation_id: number
}

export interface MangaGroup {
  /**
   * Group id
   */
  id: number

  /**
   * Group name
   */
  name: string
}

export interface MangaData {
  /**
   * Manga title
   */
  title: string

  /**
   * Alternative names
   */
  alt_names: string[]

  /**
   * Manga artist
   */
  artist: string

  /**
   * Manga author
   */
  author: string

  /**
   * Comments count
   */
  comments: number

  /**
   * Relative path to cover
   */
  cover_url: string

  /**
   * Relative paths to manga volumes covers
   */
  covers: string[]

  demographic: number

  /**
   * Manga description
   */
  description: string

  follows: number

  /**
   * Manga genres
   */
  genres: Genre[]

  /**
   * Hentai manga boolean (0 or 1)
   */
  hentai: number

  /**
   * Manga language flag
   */
  lang_flag: string

  /**
   * Manga language name
   */
  lang_name: string

  /**
   * Manga last chapter number (0 if manga is not finished)
   */
  last_chapter: string

  /**
   * Last updated unix timestamp
   */
  last_updated: number

  /**
   * Last volume (null if manga not finished)
   */
  last_volume: number

  /**
   * Manga links (amazon, mal, raw, e.t.c)
   */
  links: Map<string, string>

  /**
   * Manga rating
   */
  rating: MangaRating

  /**
   * Related manga
   */
  related: MangaRelated[]

  /**
   * Manga status  
   * 1 - ongoing  
   * 2 - completed  
   * 3 - cancelled  
   * 4 - hiatus
   */
  status: number

  /**
   * Manga views
   */
  views: number
}

export interface MangaChapter {
  /**
   * Chapter id
   */
  id: number

  /**
   * Chapter number
   */
  chapter: string

  /**
   * Comments count
   */
  comments: number | null

  group_id: number
  group_id_2: number
  group_id_3: number
  group_name: string
  group_name_2: string | null
  group_name_3: string | null

  /**
   * Chapter language code (gb, jp, ru, e.t.c.)
   */
  lang_code: string

  /**
   * Chapter language full name
   */
  lang_name: string

  /**
   * Chapter title
   */
  title: string

  /**
   * Unix timestamp when chapter was published.
   */
  timestamp: number

  /**
   * Chapter volume
   */
  volume: string
}

export interface Manga {
  /**
   * Manga data
   */
  manga: MangaData

  /**
   * Chapters list
   */
  chapter: Array<MangaChapter>

  /**
   * Groups that work on this manga
   */
  group: Array<MangaGroup>

  /**
   * Response status
   */
  status: string
}

export interface Chapter extends MangaChapter {
  /**
   * Manga id
   */
  manga_id: number

  /**
   * One of these:
   * `unavailable` - means chapter was deleted
   * `external` - means chapter is not hosted on mangadex
   * `OK` - ok
   */
  status: string

  long_strip: number

  /**
   * Hash for server images
   */
  hash: string

  /**
   * Chapter pages list
   */
  page_array: string[]

  /**
   * Chapter server url
   */
  server: string

  /**
   * Fallback server url
   */
  server_fallback?: string

  /**
   * Shows only if manga is now hosted on mangadex (Like [Dr. Stone](https://mangadex.org/manga/20882))
   * Will contain url to chapter.
   */
  external?: string
}
export interface Genre {
  /**
   * Genre id
   */
  id: number

  /**
   * Genre name
   */
  name: string
}

export interface SearchResult {
  titles: Array<SearchResultTitle>
  current_page: number
}

export interface SearchResultTitle {
  id: number
  title: string
  image_url: string
  description: string
  views: number
  follows: number
  rating: {
    value: number
    votes: number
  }
  lang_name: string
}

export type Status = 'Ongoing' | 'Completed' | 'Cancelled' | 'Hiatus'

export interface Link {
  title: string
  url: string
}

export type OriginalLanguage =
  | English
  | Japanese
  | Polish
  | German
  | French
  | Vietnamese
  | Chinese
  | Indonesian
  | Korean
  | SpanishLATAM
  | Thai
  | Filipino
  | ChineseTrad

type English = 1
type Japanese = 2
type Polish = 3
type German = 8
type French = 10
type Vietnamese = 12
type Chinese = 21
type Indonesian = 27
type Korean = 28
type SpanishLATAM = 29
type Thai = 32
type Filipino = 34
type ChineseTrad = 35

export type Demographic = Array<number>

export type PublicationStatus = Array<number>

export type Tags = Array<number>

export interface MangadexUser {
  username: string
  language: string
  joined: string
  photo_url: string
  stats?: {
    views: number
    uploads: number
  }
  website?: string
  last_online?: string
}

export interface MangadexGroup extends MangaGroup {
  banner: string
  stats: {
    views: number
    follows: number
    total_chapters: number
  }
  links: {
    discord?: string
    website?: string
    irc?: string
    email?: string
  }
  leader: {
    id: number
    username: string
  }
  members: {
    id: number
    username: string
  }[]
  upload_restrictions: string
  description: string
}

interface MangadexHomeUpdate {
  id: number
  chapter: string
  title: string
  manga_id: number
  cover_url: string
  group: {
    id: number
    name: string
  }
  uploaded: string
}

interface MangadexHomeTopChapter {
  id: number
  chapter: string
  title: string
  manga_id: number
  cover_url: string
  views: number
}

interface MangadexHomeTopManga {
  id: number
  title: string
  cover_url: string
  follows: number
  rating: number
  users: number
}

export interface MangadexHome {
  announcement?: { text: string }
  latest_updates: {
    all: MangadexHomeUpdate[]
    follows: string | MangadexHomeUpdate[]
  }
  top_chapters: {
    six_hours: MangadexHomeTopChapter[]
    day: MangadexHomeTopChapter[]
    week: MangadexHomeTopChapter[]
  }
  top_manga: {
    follows: MangadexHomeTopManga[]
    rating: MangadexHomeTopManga[]
  }
}

export interface MangaFollows {
  title: string
  manga_id: number
  follow_type: number
  volume: string
  chapter: string
}

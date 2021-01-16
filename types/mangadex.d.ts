import { Language } from './language'

export type Status = 'Ongoing' | 'Completed' | 'Cancelled' | 'Hiatus'

export interface Link {
  /**
   * Link title
   */
  title: string

  /**
   * Link url
   */
  url: string
}

export type OriginalLanguage =
  | 'amz'
  | 'mal'
  | 'nu'
  | 'bw'
  | 'raw'
  | 'mu'
  | 'ebj'
  | 'engtl'
  | 'cdj'
  | 'kt'
  | 'ap'
  | 'al'

export type Links = { [K in OriginalLanguage]: string }

export interface MangaRating {
  /**
   * Bayesian rating
   * @description https://en.wikipedia.org/wiki/Bayesian_average
   */
  bayesian: number

  /**
   * Average rating, the sum of the ratings divided by the number of rating responses
   */
  mean: number

  /**
   * Rated by users count
   */
  users: number
}

export interface Relation {
  id: number
  name: string
  pairId: number
}

export interface RelatedManga {
  /**
   * Related manga id
   */
  id: number

  /**
   * Is related manga a hentai
   */
  isHentai: boolean

  /**
   * Related manga title
   */
  title: string

  /**
   * Relation: 4 - Spin-off, 8 - Doujinshi, 10 - Coloured
   */
  type: number
}

export interface PartialGroup {
  /**
   * Group id
   */
  id: number

  /**
   * Group name
   */
  name: string
}

export interface MangaPublication {
  demographic: number
  /**
   * Language code
   */
  language: Language

  /**
   * Manga status: 1 - ongoing, 2 - completed, 3 - cancelled, 4 - hiatus
   */
  status: number
}

export interface PartialManga {
  /**
   * Manga id
   */
  id: number

  /**
   * Is hentai (18+)
   */
  isHentai: boolean

  /**
   * Last chapter number
   */
  lastChapter?: string
  /**
   * Last volume number
   */
  lastVolume?: string
  /**
   * Absolute path to cover url
   */
  mainCover: string
  /**
   * Manga name
   * @deprecated This option will be removed in future updates
   */
  name: string

  /**
   * Manga title
   */
  title: string
}

export interface Manga {
  /**
   * Alternative names
   */
  altTitles: string[]

  /**
   * Manga artist
   */
  artist: string[]

  /**
   * Manga author
   */
  author: string[]

  /**
   * Comments count
   */
  comments: number

  /**
   * Manga description
   */
  description: string

  /**
   * How many users read this manga
   */
  follows: number

  /**
   * Manga id
   */
  id: number

  /**
   * Is hentai (18+)
   */
  isHentai: boolean

  /**
   * Last chapter number. Is null if manga haven't finished
   */
  lastChapter?: string

  /**
   * Last uploaded (unix timestamp)
   */
  lastUploaded: number

  /**
   * Last volume number
   */
  lastVolume?: string

  /**
   * Information links
   */
  links: Links

  /**
   * Absolute path to cover url
   */
  mainCover: string

  /**
   * Publication metadata
   */
  publication: MangaPublication

  /**
   * Manga rating
   */
  rating: MangaRating

  /**
   * Related manga
   */
  relations: RelatedManga[]

  /**
   * Manga genres
   */
  tags: number[]

  /**
   * Manga title
   */
  title: string

  /**
   * Manga views
   */
  views: number
}

export interface FormattedMangaPublication extends MangaPublication {
  /**
   * Language name
   */
  languageName: string
}

// To overwrite links and tags we need to use Omit
export interface FormattedManga extends Omit<Manga, 'links'> {
  /**
   * Information links
   */
  links: Link[]

  /**
   * Manga publication metadata
   */
  publication: FormattedMangaPublication
}

export interface PartialChapter {
  /**
   * Chapter
   */
  chapter: string

  /**
   * Comments count
   */
  comments: number

  /**
   * Group ids
   */
  groups: number[]

  /**
   * Chapter hash
   */
  hash: string

  /**
   * Chapter id
   */
  id: number

  /**
   * Chapter language
   */
  language: Language

  /**
   * Manga id
   */
  mangaId: number

  /**
   * Manga title
   */
  mangaTitle?: string

  /**
   * Chapter thread id
   */
  threadId?: number

  /**
   * Publication unix timestamp
   */
  timestamp: number

  /**
   * Chapter title
   */
  title: string

  /**
   * Chapter uploader id
   */
  uploader: number

  views: number

  volume?: string
}

export interface Chapter {
  /**
   * Chapter
   */
  chapter: string

  /**
   * Comments count
   */
  comments?: number

  /**
   * Chapter released by those groups
   */
  groups: PartialGroup[]

  /**
   * Chapter hash
   */
  hash: string

  /**
   * Chapter id
   */
  id: number

  /**
   * Chapter language code (gb, jp, ru, e.t.c.)
   */
  language: Language

  /**
   * Manga id
   */
  mangaId: number

  /**
   * Manga title
   */
  mangaTitle: string

  /**
   * Chapter pages
   *
   * Is string only when status = 'external'
   */
  pages: string | string[]

  /**
   * Server url
   */
  server?: string

  /**
   * Fallback server url
   */
  serverFallback?: string

  /**
   * Chapter status
   */
  status: 'OK' | 'error'

  /**
   * Chapter thread id
   */
  threadId?: number

  /**
   * Unix timestamp when chapter was published.
   */
  timestamp: number

  /**
   * Chapter title
   */
  title: string

  /**
   * Uploader id
   */
  uploader: number

  /**
   * Views count
   */
  views: number

  /**
   * Chapter volume
   */
  volume: string
}

export interface FormattedChapter extends Chapter {
  /**
   * Chapter language full name
   */
  languageName: string

  /**
   * Pages on fallback server
   */
  fallbackPages?: string[]
}

export interface MangaCover {
  /**
   * URL to cover (absolute)
   */
  url: string

  /**
   * Volume number
   */
  volume: string
}

export interface PartialTag {
  /**
   * Tag id
   */
  id: number

  /**
   * Tag name
   */
  name: string
}

export interface Tag extends PartialTag {
  /**
   * Tag group
   */
  group: 'Format' | 'Genre' | 'Theme' | 'Content'
  description?: string
}

export interface SearchResultTitle {
  id: number
  title: string
  image_url: string
  description?: string
  views: number
  follows: number
  rating: {
    value: number
    votes: number
  }
  is_hentai: boolean
  lang_name: string
}

export interface SearchResult {
  titles: SearchResultTitle[]
  current_page?: number
  last_page?: number
}

export interface User {
  avatar?: string
  biography: string
  id: number
  joined: number
  lastSeen: number
  levelId: number
  mdAtHome: number
  premium: boolean
  uploads: number
  username: string
  views: number
  website: string
}

export interface Group extends PartialGroup {
  altNames: string
  banner?: string
  chapters: number
  delay: number
  description: string
  discord: string
  email: string
  follows: number
  /**
   * Group founded date current format: 2020-06-22
   */
  founded: string
  ircChannel: string
  ircServer: string
  isInactive: boolean
  isLocked: boolean
  language: Language
  /**
   * Last updated unix timestamp
   */
  lastUpdated: number
  leader: {
    id: number
    name: string
  }
  likes: number
  members: {
    id: number
    name: string
  }[]
  threadId: number
  threadPosts: number
  views: number
  website: string
}

export interface PartialChapters {
  /**
   * Partial chapters belonging to the group
   */
  chapters: PartialChapter[]

  groups: Group[]
}

export interface FollowType {
  id: number
  name: string
}

export interface MangadexHomeUpdate {
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

export interface MangadexHomeTopChapter {
  id: number
  chapter: string
  title: string
  manga_id: number
  cover_url: string
  views: number
}

export interface MangadexHomeTopManga {
  id: number
  title: string
  cover_url: string
  follows: number
  rating: number
  users: number
}

export interface MangadexHome {
  announcement?: { text: string; url?: string }
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

export interface UserManga {
  chapter: string
  followType: number
  mangaId: number
  mangaTitle?: string
  mainCover?: string
  rating: number
  userId: number
  isHentai: boolean
  volume?: string
}

export interface UserMangaRating {
  mangaId: number
  rating?: number
}

export interface UserSettings {
  excludedTags: { id: number }[]
  hentaiMode: number
  id: number
  latestUpdates: number
  showModeratedPosts: boolean
  showUnavailableChapters: boolean
  shownChapterLangs: { id: string }[]
}

export interface FollowedPartialChapter extends PartialChapter {
  /**
   * Chapter read status
   */
  read: boolean
}

export interface FollowedUpdates {
  chapters: FollowedPartialChapter[]
  groups: Group[]
  manga: {
    [x: string]: PartialManga
  }
}

export interface FormattedFollowedUpdates
  extends Omit<FollowedUpdates, 'manga'> {
  manga: PartialManga[]
}

export interface ReadChaptersStatus {
  read?: number[]
  unread?: number[]
}

export interface SetHomePageSettingsArguments {
  /**
   * Theme id
   *
   * 1 - Light, 2 - Dark, 3 - Light-Bronze, 4 - Dark-Bronze, 5 - Light-Slate, 6 - Dark-Slate, 7 - Abyss
   */
  themeId: number

  /**
   * Displaying language id
   */
  displayLangId: number

  /**
   * Hentai mode
   *
   * 0 - Hide Hentai, 1 - View All, 2 - Only Hentai
   */
  hentaiMode: number
}

export type MangadexApiResponse<T> =
  | {
      code: number
      status: 'OK'
      data: T
    }
  | {
      code: number
      status: 'error'
      message: string
    }

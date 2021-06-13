/**
 * Stored as id
 *
 * https://anilist.co/manga/`{id}`
 */
export type Anilist = 'al'

/**
 * Stored as slug
 *
 * https://www.anime-planet.com/manga/`{slug}`
 */
export type AnimePlanet = 'ap'

/**
 * Stored has "series/{id}"
 *
 * https://bookwalker.jp/`{slug}`
 */
export type Bookwalker = 'bw'

/**
 * Stored as full URL
 */
export type CDJapan = 'cdj'

/**
 * Stored has id
 *
 * https://www.mangaupdates.com/series.html?id=`{id}`
 */
export type MangaUpdates = 'mu'

/**
 * Stored has slug
 *
 * https://www.novelupdates.com/series/`{slug}`
 */
export type NovelUpdates = 'nu'

/**
 * If integer, use id version of the URL, otherwise use slug one
 *
 * https://kitsu.io/api/edge/manga/`{id}` or https://kitsu.io/api/edge/manga?filter[slug]={slug}
 */
export type KitsuIO = 'kt'

/**
 * Stored as full URL
 */
export type Amazon = 'amz'

/**
 * Stored as full URL
 */
export type EBookJapan = 'ebj'

/**
 * Store as id
 *
 * https://myanimelist.net/manga/{id}
 */
export type MyAnimeList = 'mal'

/**
 * Stored as full URL, untranslated stuff URL (original language)
 */
export type Raw = 'raw'

/**
 * Stored as full URL, official english licensed URL
 */
export type Engtl = 'engtl'

export type MangaLink =
  | Anilist
  | AnimePlanet
  | Bookwalker
  | CDJapan
  | MangaUpdates
  | NovelUpdates
  | KitsuIO
  | Amazon
  | EBookJapan
  | MyAnimeList
  | Raw
  | Engtl

export type Links = { [K in MangaLink]?: string }

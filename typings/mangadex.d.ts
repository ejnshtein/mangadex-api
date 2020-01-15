export interface Chapter {
	id: ChapterId
	timestamp: number
	hash: string
	volume: string
	chapter: string
	title: string
	lang_name: string
  lang_code: LangCode
  manga_id: number
  group_id: number
  group_id_2: number
  group_id_3: number
  comments: number
  server: string
  page_array: Array<string>
  long_strip: number
  status: string
}

export type MangaId = string | number

export type LangCode =
	| 'sa'
	| 'bd'
	| 'bg'
	| 'mm'
	| 'ct'
	| 'cn'
	| 'hk'
	| 'cz'
	| 'dk'
	| 'nl'
	| 'gb'
	| 'ph'
	| 'fi'
	| 'fr'
	| 'de'
	| 'gr'
	| 'hu'
	| 'id'
	| 'it'
	| 'jp'
	| 'kr'
	| 'lt'
	| 'my'
	| 'mn'
	| 'ir'
	| 'pl'
	| 'br'
	| 'pt'
	| 'ro'
	| 'ru'
	| 'rs'
	| 'es'
	| 'mx'
	| 'se'
	| 'th'
	| 'tr'
	| 'ua'
	| 'vn'


export interface Title {
  manga: MangaDescription
  chapter: Array<MangaChapter> & Map<MangaId, MangaChapter>
  status: string
}

// export interface FixedTitle {
//   manga: MangaDescription
//   chapter: 
//   status: string
// }

export interface MangaChapter {
  id: ChapterId
  volume: string
  chapter: string
  title: string
  lang_code: LangCode
  group_id: number
  group_name: string | null
  group_id_2: number
  group_name_2: string | null
  group_id_3: number
  group_name_3: string | null
  timestamp: number
}

type ChapterId = number | undefined

export interface MangaDescription {
  cover_url: string
  description: string
  title: string
  artist: string
  author: string
  status: number
  status_text?: Status
  genres: Array<Genre> & Array<number>
  last_chapter: string
  lang_name: string
  lang_flag: LangCode
  hentai: 0 | 1
  links: Array<Link> | Map<string, string>
}

export interface Genre {
  id: number
  label: string
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

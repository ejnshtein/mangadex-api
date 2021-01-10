import { Composer } from '../Composer'
import {
  Chapter,
  FormattedChapter,
  FormattedManga,
  Manga
} from '../../types/mangadex'

export const normalizeManga = (manga: Manga): FormattedManga => ({
  ...manga,
  links: Composer.getMangaLinks(manga.links),
  description: Composer.parseToHTML(manga.description),
  publication: {
    ...manga.publication,
    languageName: Composer.getLangName(manga.publication.language)
  }
})

export const normalizeChapter = (chapter: Chapter): FormattedChapter => ({
  ...chapter,
  pages: Array.isArray(chapter.pages)
    ? chapter.pages.map((page) => `${chapter.server}${chapter.hash}/${page}`)
    : chapter.pages,
  fallbackPages: Array.isArray(chapter.pages)
    ? chapter.pages.map(
        (page) =>
          `${chapter.serverFallback || chapter.server}${chapter.hash}/${page}`
      )
    : null,
  languageName: Composer.getLangName(chapter.language)
})

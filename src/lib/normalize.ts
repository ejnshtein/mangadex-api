import { Composer } from '../Composer'
import {
  Chapter,
  FormattedChapter,
  FormattedManga,
  Manga
} from '../../types/mangadex'

export const normalizeManga = (manga: Manga): FormattedManga => ({
  ...manga,
  tags: Composer.getGenres(manga.tags),
  links: Composer.getMangaLinks(manga.links),
  description: Composer.parseToHTML(manga.description),
  publication: {
    ...manga.publication,
    languageName: Composer.getLangName(manga.publication.language)
  }
})

export const normalizeChapter = (chapter: Chapter): FormattedChapter => ({
  ...chapter,
  pages: chapter.pages.map(
    (page) => `${chapter.server}${chapter.hash}/${page}`
  ),
  fallbackPages: chapter.pages.map(
    (page) => `${chapter.serverFallback}${chapter.hash}/${page}`
  ),
  languageName: Composer.getLangName(chapter.language)
})

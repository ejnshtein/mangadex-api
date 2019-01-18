import * as md from './mangadex.d'
import { AxiosRequestConfig } from 'axios'

export const Mangadex: Mangadex

export interface MangadexConstructor {
  new (): Mangadex
}

export interface Mangadex extends Composer {

  getManga (mangaId: string | number, normalize?: Boolean, params?: AxiosRequestConfig): Promise<md.Title>

  getChapter (chapterId: string | number, normalize?: boolean, params?: AxiosRequestConfig): Promise<md.Chapter>

  search (query: string, searchSegment?: md.SearchSegment, params?: AxiosRequestConfig): Promise<md.SearchResult>

}

export interface Composer {

  getGenres (genre: number | string): Array<{ id: number, label: string }>

  getMangaLinks (link: Map<string, string>): Array<{ title: string, url: string }>

  getStatus (status: number): string

  getLangName (landCode: string): string

}

export default Mangadex
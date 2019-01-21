# Mangadex-api

[![NPM Version](https://img.shields.io/npm/v/mangadex-api.svg?style=flat-square)](https://www.npmjs.com/package/mangadex-api)
[![npm downloads](https://img.shields.io/npm/dm/mangadex-api.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mangadex-api)

This is [Mangadex](https://mangadex.org) website api wrapper with some custom methods.  

## Installation

```
  npm i mangadex-api
```

## Example

```js
const Mangadex = require('mangadex-api')

Mangadex.getManga(22723).then(({ manga, chapter }) => {
  console.log(manga.title, chapter.length)
})

Mangadex.getChapter(8857).then(chapter => {
  console.log(chapter.title, chapter.volume, chapter.chapter)
})

Mangadex.search('senko').then(response => {
  console.log(response.titles.length)
})
```

P.S. Manga from example: [Sewayaki Kitsune no Senko-san](https://mangadex.org/title/22723)  

## API

---

### getManga

`Mangadex.getManga(mangaId, [normalize], [params]): Promise<`[`Title`](#Title)`>`

| Argument | Type | Description |
|-|-|-|
| **mangaId** | `number` \| `string` | Mangadex manga id |
| **normalize=true** | `boolean` | Will transform some manga object properties. [Details](#Manga-normalize-example) |
| **params** | `AxiosRequestConfig` | [github.com/axios/axios#request-config](https://github.com/axios/axios#request-config) |

---

### getChapter

`Mangadex.getChapter(chapterId, [normalize], [params]): Promise<`[`Chapter`](#Chapter)`>`

| Argument | Type | Description |
|-|-|-|
| **chapterId** | `number` \| `string` | Mangedex chapter id |
| **normalize=true** | `boolean` | Will transform some manga object properties. [Details](#Chapter-normalize-example) |
| **params** | `AxiosRequestConfig` | [github.com/axios/axios#request-config](https://github.com/axios/axios#request-config) |

---

### search

`Mangadex.search(query, [searchSegment], [params]): Promise<`[`SearchResult`](#SearchResult)`>`

| Argument | Type | Description |
|-|-|-|
| **query** | `string` | Query string for searching on [mangadex](https://mangadex.org/search) |
| **searchSegment='title'** | `searchSegment` | Will specify search request segment . There are 3 segments to search: `title`, `artist` and `author`. By default used `title` segment, because basically people search manga by this parameter.  |
| **params** | `AxiosRequestConfig` | [github.com/axios/axios#request-config](https://github.com/axios/axios#request-config) |

---

## Types

### Title

| Property name | Type |
|-|-|
| **manga** | [`MangaDescription`](#MangaDescription) |
| **chapter** | `Array`<[`MangaChapter`](#MangaChapter)> \| `Map`<[`MangaId`](#MangaId), [`MangaChapter`](#MangaChapter)> |
| **status** | `string` |

---

### Chapter

| Property name | Type |
|-|-|
| **id**  | [`ChapterId`](#ChapterId) |
| **timestamp** | `number` |
| **hash** | `string` |
| **volume** | `string` |
| **chapter** | `string` |
| **title** | `string` |
| **lang_name** | `string` |
| **lang_code** | [`LangCode`](#LangCode) |
| **manga_id** | `number` |
| **group_id** | `number` |
| **group_id_2** | `number` |
| **group_id_3** | `number` |
| **comments** | `number` |
| **server** | `string` |
| **page_array** | `Array`<`string`> |
| **long_strip** | `number` |
| **status** | `string` |

---

### MangaDescription

| Property name | Type |
|-|-|
| **cover_url** | `string` | // non-absolute
| **description** | `string` |
| **title** | `string` |
| **artist** | `string` |
| **author** | `string` |
| **status** | `number` |
| [**status_text**] | [`Status`](#Status) |
| **genres** | `Array`<[`Genre`](#Genre)> \| `Array`<`number`> |
| **last_chapter** | `string` |
| **lang_name** | `string` |
| **lang_flag** | [`LangCode`](#LangCode) |
| **hentai** | `0` `|` `1` | // ( ͡~ ͜ʖ ͡°)
| **links** | `Array`<[`Link`](#Link)> \| `Map`<`string`, `string`> |

---

### MangaChapter

| Property name | Type |
|-|-|
| **id** | [`ChapterId`](#ChapterId) |
| **volume** | `string` |
| **chapter** | `string` |
| **title** | `string` |
| **lang_code** | [`LangCode`](#LangCode) |
| **group_id** | `number` |
| **group_name** | `string` | `null` |
| **group_id_2** | `number` |
| **group_name_2** | `string` | `null` |
| **group_id_3** | `number` |
| **group_name_3** | `string` | `null` |
| **timestamp** | `number` |

---

### SearchResult

| Property name | Type |
|-|-|
| **titles** | `Array`<[`SearchResultTitle`](#SearchResultTitle)> |
| **current_page** | `number` |

---

### SearchResultTitle

| Property name | Type | Description |
|-|-|-|
| **id** | `number` | Mangadex manga id |
| **title** | `string` | Manga title |
| **image_url** | `string` | Absolute path to manga cover |
| **description** | `string` | Manga description |
| **views** | `number` | Manga views |
| **follows** | `number` | Manga follows count |
| **rating** | `Object`<{ **value**: `number`, **votes**: `number` }> | `rating.value` is average score by 10 scale, `rating.votes` is votes count |
| **lang_name** | `string` | Manga original language | 

---

### Genre

| Property name | Type |
|-|-|
| **id** | `number` |
| **label** | `string` |

---

### Link

| Property name | Type |
|-|-|
| **title** | `string` |
| **url** | `string` |

---

### LangCode

| Type |
|-|
| 'sa' \| 'bd' \| 'bg' \| 'mm' \| 'ct' \| 'cn' \| 'hk' \| 'cz' \| 'dk' \| 'nl' \| 'gb' \| 'ph' \| 'fi' \| 'fr' \| 'de' \| 'gr' \| 'hu' \| 'id' \| 'it' \| 'jp' \| 'kr' \| 'lt' \| 'my' \| 'mn' \| 'ir' \| 'pl' \| 'br' \| 'pt' \| 'ro' \| 'ru' \| 'rs' \| 'es' \| 'mx' \| 'se' \| 'th' \| 'tr' \| 'ua' \| 'vn' |

---

### MangaId

| Type |
|-|
| `string` | `number` |

---

### ChapterId

| Type |
|-|
| `string` | `number` |

---

### Status

| Type |
|-|
| 'Ongoing' \| 'Completed' \| 'Cancelled' \| 'Hiatus' |

---

## Normalize examples

### Manga normalize example

**Manga.manga.chapter** object will became an array and chapters in array will receive **id** and **lang_name** property.  
**Manga.manga.cover_url** will became an absolute path to image.  
**Manga.manga.genres** will became an array of **Genre**.  
**Manga.manga** will receive **.status_text** property with **Status** type.  
**Manga.manga.links** will became an array of **Link**.  

---

### Chapter normalize example

**Chapter.server** will became an absolute path of server.  
**Chapter.page_array** will became an array of images with absolute path.  

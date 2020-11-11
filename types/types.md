# Types

## Title

| Property name | Type |
|-|-|
| **manga** | [`MangaDescription`](#MangaDescription) |
| **chapter** | `Array`<[`MangaChapter`](#MangaChapter)> |
| **group** | `Array`<[`MangaGroup`](#MangaGroup)> |
| **status** | `string` |

---

## Chapter

| Property name | Type |
|-|-|
| **id**  | `number` |
| **timestamp** | `number` |
| **hash** | `string` |
| **volume** | `string` |
| **chapter** | `string` |
| **title** | `string` |
| **lang_name** | `string` |
| **lang_code** | `string` |
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

## MangaDescription

| Property name | Type |
|-|-|
| **cover_url** | `string` | // non-absolute
| **description** | `string` |
| **title** | `string` |
| **artist** | `string` |
| **author** | `string` |
| **status** | `number` |
| [**status_text**] | [`Status`](#Status) |
| **genres** | `Array`<[`Genre`](#Genre)> |
| **last_chapter** | `string` |
| **lang_name** | `string` |
| **lang_flag** | [`LangCode`](#LangCode) |
| **hentai** | `0` `|` `1` | // ( ͡~ ͜ʖ ͡°)
| **links** | `Array`<[`Link`](#Link)> |

---

## MangaChapter

| Property name | Type |
|-|-|
| **id** | `number` |
| **volume** | `string` |
| **chapter** | `string` |
| **title** | `string` |
| **lang_code** | `string` |
| **group_id** | `number` |
| **group_name** | `string` | `null` |
| **group_id_2** | `number` |
| **group_name_2** | `string` | `null` |
| **group_id_3** | `number` |
| **group_name_3** | `string` | `null` |
| **timestamp** | `number` |

---

## MangaGroup

| Property name | Type |
|-|-|
| **id** | `number` |
| **name** | `string` |

---

## SearchResult

| Property name | Type |
|-|-|
| **titles** | `Array`<[`SearchResultTitle`](#SearchResultTitle)> |
| **current_page** | `number` |

---

## SearchResultTitle

| Property name | Type | Description |
|-|-|-|
| **id** | `number` | Manga id |
| **title** | `string` | Manga title |
| **image_url** | `string` | Absolute path to manga cover |
| **description** | `string` | Manga description |
| **views** | `number` | Manga views |
| **follows** | `number` | Manga follows count |
| **rating** | `Object`<{ **value**: `number`, **votes**: `number` }> | `rating.value` is average score by 10 scale, `rating.votes` is votes count |
| **lang_name** | `string` | Manga original language | 

---

## SearchQuery

| Property name | Type | Description |
|-|-|-|
| **[title]**| `string` | Manga title |
| **[author]**| `string` | Author |
| **[artist]**| `string` | Artist |
| **[lang_id]**| `string` | Original language |
| **[demos]**| `Array<number>` | Demographic |
| **[statuses]**| `Array<number>` | Publication status |
| **[tags]**| `Array<number>` | Tags |
| **[tag_mode_inc_all]**| `all` \| `any` | Tag inclusion mode |
| **[tag_mode_exc]**| `all` \| `any` | Tag exclusion mode |

---

## Genre

| Property name | Type |
|-|-|
| **id** | `number` |
| **label** | `string` |

---

## Link

| Property name | Type |
|-|-|
| **title** | `string` |
| **url** | `string` |

---

## Status

| Type |
|-|
| 'Ongoing' \| 'Completed' \| 'Cancelled' \| 'Hiatus' |

---

## User

| Property name | Type | Description |
|-|-|-|
| **username** | `string` | Username |
| **language** | `string` | Language |
| **joined** | `string` | Join date in format `YYYY-MM-DD` |
| **photo_url** | `string` | User photo |
| **[stats]** | `{ views: number, uploads: number }` | User stats |
| **[website]** | `string` | User website |
| **[last_online]** | `string` | Last online (relative) |

---

## Group

| Property name | Type | Description |
|-|-|-|
| **name** | `string` | Group name |
| **banner** | `string` | Url to banner |
| **[stats]** | `{ views: number, follows: number, total_chapters: number }` | Group stats |
| **links** | `{ [string]: string }`| Group links |
| **leader** | `{ id: number, username: string }` | Group leader info |
| **members** | `Array<{ id: number: username: string }>`| Group members info |
| **upload_restrictions** | `string` | Group upload restrictions |
| **description** | `string` | Group description (in HTML format) |

---

## Home

| Property name | Type | Description |
|-|-|-|
| **accouncement** | `null` \| `{ text: string, [url]: string }` | Announcement info |
| **latest_updates** | `{ all: Array<>, follows: Array<> }`| Latest updates |
| **top_chapters** | `{ six_hours: Array<>, day: Array<>, week: Array<> }`| Chapters top |
| **top_manga** | `{ follows: Array<>, rating: Array<> }`| Manga top |

---

## MangaFollows

| Property name | Type | Description |
|-|-|-|
| **title** | `string` | Manga title |
| **manga_id** | `number`| Manga id |
| **follow_type** | `number`| Follows type |
| **volume** | `string`| Latest read volume |
| **chapter** | `string`| Latest chapter chapter |

---

## RequestOptions

| Property name | Type |
|-|-|
| **[params]** | { [string]: string } |
| **[headers]** | { [string]: string } |
| **[json]** | `boolean` |
| **[responseType]** | `string` |

---

## RequestResult

| Property name | Type |
|-|-|
| **data** | [Readable](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_readable_streams) \| `string` \| `object` |
| **headers** | { [string]: string } |
| **staus** | `number` |
| **statusText** | `string` |
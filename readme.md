# Mangadex-api

[![NPM Version](https://img.shields.io/npm/v/mangadex-api.svg?style=flat-square)](https://www.npmjs.com/package/mangadex-api)
[![npm downloads](https://img.shields.io/npm/dm/mangadex-api.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mangadex-api)

This is [Mangadex](https://mangadex.org) website api wrapper.

## Installation

```shell
  npm i mangadex-api
```

## Example

```js
const Mangadex = require('mangadex-api')

Mangadex.getManga(22723).then(({ manga, chapter, group }) => {
  console.log(`Manga ${manga.title} has ${chapter.length} chapters.`)
  console.log(`And contributed by ${group.length} groups.`)
})

Mangadex.getChapter(8857).then(chapter => {
  console.log(`Chapter title is "${chapter.title}" and it is ${chapter.chapter} chapter from ${chapter.volume} volume.`)
})

// currently requires authorization
Mangadex.search('senko').then(response => {
  console.log(`Found ${response.titles.length} titles.`)
})

Mangadex.getHome().then(home => {
  if (home.accouncement) {
    console.log(`New accouncement!\n${home.accouncement.text}`)
  }
  console.log(`Todays top manga by follows is: ${home.top_manga.follows[0].title}`)
  console.log(`Todays top chapter is from manga: ${home.top_chapters.day[0].title}`)
  console.log(`Latest chapter is from manga: ${home.latest_updates.all[0].title}`)
})

Mangadex.getGroup(12).then(group => {
  console.log(`Group ${group.name} has ${group.stats.follows} followers and ${group.stats.total_chapters} total chapters uploaded!`)
})

```

## Authorization example

```js
const Mangadex = require('mangadex-api')

const client = new Mangadex({
  host: 'https://mangadex.cc',
  apiHost: 'https://mangadex.cc/api'
})

client.agent.login('username', 'password', false)
  .then(async () => {

    const result = await client.search('To Be Winner')

    console.log(result)

    await client.agent.saveSession('/path/to/session')

  })

```
## Cached session example

```js
// first you must save your session somewhere

client.agent.login('username', 'password', false)
  .then(() => client.agent.saveSession('/path/to/session'))

// now we can use it

client.agent.loginWithSession('/path/to/session')
  .then(() => client.getMe())
  .then(me => {
    console.log(me)
  })

```


## Notes

**[Notice]:** Currently Mangadex has closed search for anonymous use, so you must login first.

**[]** - optional

**static** - static method


## API

---

### Mangadex

#### constructor

`const client = new Mangadex([options]): Mangadex`

New Mangadex Api instance.

| Property | Type | Description |
|-|-|-|
| **options.host** | `string` | Mangadex host address. By default - `https://mangadex.org` |
| **options.apiHost** | `string` | Mangadex api host address. By default - `https://mangadex.org/api` |
| **options.cacheTimeout** | `number` | Default cache timeout for both manga and chapter data. (ms) |
| **options.mangaCacheTimeout** | `number` | Default cache timeout for manga data. (ms) |
| **options.chapterCacheTimeout** | `number` | Default cache timeout for chapter data. (ms) |
| **options.cacheMangaResult** | `boolean` | Set `true` if you want to use caching for manga data. |
| **options.cacheChapterResult** | `boolean` | Set `true` if you want to use caching for chapter data. |
| **options.shareMangaCache** | `boolean` | If `true` will use shared manga in-memory store instead of Mangadex instance cache store. (Works with timeout **mangaCacheTimeout** option) |
| **options.shareChapterCache** | `boolean` | If `true` will use shared chapter in-memory store instead of Mangadex instance cache store. (Works with timeout **chapterCacheTimeout** option) |

Default `options` config:

```json
{
  "host": "https://mangadex.org",
  "apiHost": "https://mangadex.org/api",
  "cacheTimeout": 600000,
  "mangaCacheTimeout": 0,
  "chapterCachetimeout": 0,
  "cacheMangaResult": false,
  "cacheChapterResult": false,
  "shareMangaCache": false,
  "shareChapterCache": false
}
```

---

### properties

`client.agent: `[Agent](#Agent)

Current [Agent](#Agent) instance.

---

#### getManga & **static** getManga

`Mangadex.getManga(mangaId, [normalize], [params]): Promise<`[`Title`](#Title)`>`

Returns Mangadex manga data.

| Argument | Type | Description |
|-|-|-|
| **mangaId** | `number` \| `string` | Manga id |
| **normalize=true** | `boolean` | Will transform some manga object properties. [Details](#Manga-normalize-example) |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### getChapter & **static** getChapter

`Mangadex.getChapter(chapterId, [normalize], [params]): Promise<`[`Chapter`](#Chapter)`>`

Returns Mangadex chapter data.

| Argument | Type | Description |
|-|-|-|
| **chapterId** | `number` \| `string` | Chapter id |
| **normalize=true** | `boolean` | Will transform some manga object properties. [Details](#Chapter-normalize-example) |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### search & **static** search

`Mangadex.search(query, [params]): Promise<`[`SearchResult`](#SearchResult)`>`

***Authorization required***

Returns search result from Mangadex.

| Argument | Type | Description |
|-|-|-|
| **query** | `string` \| [SearchQuery](#SearchQuery) | When it's `string` search will be only **by title**. |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### quickSearch & **static** quickSearch

`Mangadex.quickSearch(title, [params]): Promise<`[`SearchResult`](#SearchResult)`>`

***Authorization required***

Returns quick search result from Mangadex.

| Argument | Type | Description |
|-|-|-|
| **title** | `string` | Use [Quick Search](https://mangadex.cc/quick_search). Search only **by title** |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### getUser & **static** getUser

`Mangadex.getUser(id, [params]): Promise<`[`User`](#User)`>`

Returns Mangadex user data.

| Argument | Type | Description |
|-|-|-|
| **id** | `number` \| `number` | User id |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### getGroup & **static** getGroup

`Mangadex.getGroup(id, [params]): Promise<`[`Group`](#Group)`>`

Returns Mangadex group data.

| Argument | Type | Description |
|-|-|-|
| **id** | `number` \| `number` | Group id |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### getHome & **static** getHome

`Mangadex.getGroup([params]): Promise<`[`Home`](#Home)`>`

Returns Mangadex home page data.

| Argument | Type | Description |
|-|-|-|
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### getMe

`Mangadex.getMe([params]): Promise<`[`User`](#User)`>`

Returns user info associated with current session.

| Argument | Type | Description |
|-|-|-|
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

#### getMangaFollows

`Mangadex.getMangaFollows([params]): Promise<`[`MangaFollows[]`](#MangaFollows)`>`

***Authorization required***

Returns manga followed by user.

| Argument | Type | Description |
|-|-|-|
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

### Agent

#### constructor

`const agent = new Agent([options]): Agent`

| Property | Type | Description |
|-|-|-|
| **[options.host]** | `string` | Mangadex host address. By default - `https://mangadex.org` |
| **[options.apiHost]** | `string` | Mangadex api host address. By default - `https://mangadex.org/api` |
| **[options.sessionId]** | `string` | Session Id |
| **[options.sessionExpiration]** | `string` | Session expiration date |
| **[options.persistentId]** | `string` | Session persistent id |
| **[options.hentai]** | `number` | Hentai view option. By default - 1 (show) |
| **[options.getCredentials]** | `Promise` \| `function` \| `object` |  This expects 3 fields: `sessionId`, `sessionExpiration` and as optional `persistentId`. Used to replace current session when current session expires or Mangadex sends deleted cookie. |
| **[options.loginCredentials]** | `Promise` \| `function` \| `object` | Can be used instead of passing agruments to Agent.login function. Calling Agent.login still required. Expects same fields as **options.getCredentials** |

### properties

#### getCredentials example

```js
const client = new Agent({
  getCredentials: async () => {
    const session = await Agent.login('username', 'password', false) // gain session
    await Agent.saveSession('path/to/session', session) // you can save it
    return session // and return as a result without breaking code lifecycle
  }
})
```

---

#### loginCredentials example

```js
const client = new Agent({
  loginCredentials: {
    sessionId: 'my-session-id',
    sessionExpiration: 'my session expiration in GMT',
    persistendId: 'my persistent id'
  }
})
```

---

#### setSession

`Agent.setSession(id, expiration): void`

| Property | Type | Description |
|-|-|-|
| **id** | `string` | Session Id |
| **expiration** | `string` | Session expiration date |

---

#### setSession

`Agent.setPersistent(token): void`

| Property | Type | Description |
|-|-|-|
| **token** | `string` | Session persistent id |

---

#### login

`Agent.login(username, password, [rememberMe], [options]): Promise<boolean>`

| Property | Type | Description |
|-|-|-|
| **username** | `string` | User username |
| **password** | `string` | User password |
| **[rememberMe]** | `boolean` | Remember session. By default - `false` |
| **[options]** | `object` | Options object |
| **[options.baseUrl]** | `string` | Mangadex host url. By default - `https://mangadex.org` |

---

#### **static** login

`Agent.login(username, password, [rememberMe], [options]): Promise<{ sessionId, expiration, [persistentId] }>`

| Property | Type | Description |
|-|-|-|
| **username** | `string` | User username |
| **password** | `string` | User password |
| **[rememberMe]** | `boolean` | Remember session. By default - `false` |
| **[options]** | `object` | Options object |
| **[options.baseUrl]** | `string` | Mangadex host url. By default - `https://mangadex.org` |

---

#### loginWithSession

`Agent.loginWithSession(path): Promise<boolean>`

Loads and authenticate with saved in file session.

| Property | Type | Description |
|-|-|-|
| **path** | `string` | Path to stored session. |

---

#### saveSession

`Agent.saveSession(path): Promise<boolean>`

Saves session in local file.

| Property | Type | Description |
|-|-|-|
| **path** | `string` | Path where to store session |

---

#### setCookies

`Agent.setCookies(cookies): boolean`

Sets cookies for current agent instance.

| Property | Type | Description |
|-|-|-|
| **cookies** | `array` | Array of cookies from request. |

---

#### getCookie

`Agent.getCookie(): string`

Return cookie for `Cookie` header in request.

---

#### checkLogin

`Agent.checkLogin(): Promise<boolean>`

Return true if current session in agent instance is valid.

---

#### call

`Agent.call(url, [options]): Promise<string | object>`

Calls Mangadex by given url with current session.

| Property | Type | Description |
|-|-|-|
| **url** | `string` | Url to endpoint without host. (Example: `/search` or `search`) |
| **options** | `RequestOptions` | [RequestOptions](#RequestOptions) with property `baseUrl` for calling host address (Example: `https://mangadex.cc). |

---

#### callApi

`Agent.callApi(url, [options]): Promise<object>`

Calls Mangadex Api by given path.

| Property | Type | Description |
|-|-|-|
| **url** | `string` | Url to endpoint without host. (Example: `/search` or `search`) |
| **options** | `RequestOptions` | [RequestOptions](#RequestOptions) with property `baseUrl` for calling host address (Example: `https://mangadex.cc/api). |

---

#### **static** callApi

`Agent.callApi(url, [options]): Promise<`[RequestResult](#RequestResult)`>`

Calls Mangadex Api by given path.

| Property | Type | Description |
|-|-|-|
| **url** | `string` | Url to endpoint without host. (Example: `/search` or `search`) |
| **options** | `RequestOptions` | [RequestOptions](#RequestOptions) with property `baseUrl` for calling host address (Example: `https://mangadex.cc/api). |

---

## Types

### Title

| Property name | Type |
|-|-|
| **manga** | [`MangaDescription`](#MangaDescription) |
| **chapter** | `Array`<[`MangaChapter`](#MangaChapter)> \| `Map`<`string`, [`MangaChapter`](#MangaChapter)> |
| **group** | `Array`<[`MangaGroup`](#MangaGroup)> \| `Map`<`string`, [`MangaGroup`](#MangaGroup)> |
| **status** | `string` |

---

### Chapter

| Property name | Type |
|-|-|
| **id**  | `string` \| `number` |
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
| **id** | `string` \| `number` |
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

### MangaGroup

| Property name | Type |
|-|-|
| **id** | `number` |
| **name** | `string` |

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
| **id** | `number` | Manga id |
| **title** | `string` | Manga title |
| **image_url** | `string` | Absolute path to manga cover |
| **description** | `string` | Manga description |
| **views** | `number` | Manga views |
| **follows** | `number` | Manga follows count |
| **rating** | `Object`<{ **value**: `number`, **votes**: `number` }> | `rating.value` is average score by 10 scale, `rating.votes` is votes count |
| **lang_name** | `string` | Manga original language | 

---

### SearchQuery

| Property name | Type | Description |
|-|-|-|
| **[title]**| `string` | Manga title |
| **[author]**| `string` | Author |
| **[artist]**| `string` | Artist |
| **[lang_id]**| [OriginalLanguage](#OriginalLanguage) | Original language |
| **[demos]**| `Array<number>` | Demographic |
| **[statuses]**| `Array<number>` | Publication status |
| **[tags]**| `Array<number>` | Tags |
| **[tag_mode_inc_all]**| `all` \| `any` | Tag inclusion mode |
| **[tag_mode_exc]**| `all` \| `any` | Tag exclusion mode |

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

### Status

| Type |
|-|
| 'Ongoing' \| 'Completed' \| 'Cancelled' \| 'Hiatus' |

---

### User

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

### Group

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

### Home

| Property name | Type | Description |
|-|-|-|
| **accouncement** | `null` \| `{ text: string, [url]: string }` | Announcement info |
| **latest_updates** | `{ all: Array<>, follows: Array<> }`| Latest updates |
| **top_chapters** | `{ six_hours: Array<>, day: Array<>, week: Array<> }`| Chapters top |
| **top_manga** | `{ follows: Array<>, rating: Array<> }`| Manga top |

---

### MangaFollows

| Property name | Type | Description |
|-|-|-|
| **title** | `string` | Manga title |
| **manga_id** | `number`| Manga id |
| **follow_type** | `number`| Follows type |
| **volume** | `string`| Latest read volume |
| **chapter** | `string`| Latest chapter chapter |

---

### RequestOptions

| Property name | Type |
|-|-|
| **[params]** | { [string]: string } |
| **[headers]** | { [string]: string } |
| **[json]** | `boolean` |
| **[responseType]** | `string` |

---

### RequestResult

| Property name | Type |
|-|-|
| **data** | [Readable](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_readable_streams) \| `string` \| `object` |
| **headers** | { [string]: string } |
| **staus** | `number` |
| **statusText** | `string` |

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

## Contact

[My telegram](https://t.me/ejnshtein) and a [group](https://t.me/nyaasi_chat) where you can as your questions or suggest something. 

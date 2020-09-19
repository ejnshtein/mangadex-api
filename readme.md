# Mangadex-api

[![NPM Version](https://img.shields.io/npm/v/mangadex-api.svg?style=flat-square)](https://www.npmjs.com/package/mangadex-api)
[![npm downloads](https://img.shields.io/npm/dm/mangadex-api.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mangadex-api)

This is [Mangadex](https://mangadex.org) website api wrapper.

# Migration to version 3

LRU cache was removed from package, so you'll have to implement caching by yourself.  
[Mangadex constructor](#Mangadex) now accepts only 2 options.  
[getManga](#getManga) and [getChapter](#getChapter) lost **normalize** argument, now it's on **by default**.

# Installation

```bash
npm i mangadex-api
```

Or

```bash
yarn add mangadex-api
```

# Example

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

# Authorization example

```js
const Mangadex = require('mangadex-api')

const client = new Mangadex()

await client.agent.login('username', 'password', false)

const result = await client.search('To Be Winner')

console.log(result) // { titles: [{ title: 'To Be Winner', ... }] }
```
# Cached session example

```js
// first you must save your session somewhere

await client.agent.login('username', 'password', false)

await client.agent.saveSession('/path/to/session'))

// now we can use it

await client.agent.loginWithSession('/path/to/session')

const me = await client.getMe())

console.log(me)
```


# Notes

**[Notice]:** Currently Mangadex has closed search for anonymous use, so you must login first.

**[]** - optional option

**static** - static method


# API

---

## Mangadex

`const client = new Mangadex([options]): Mangadex`

New Mangadex Api instance.

| Property | Type | Description |
|-|-|-|
| **options.host** | `string` | Mangadex host address. By default - `https://mangadex.org` |
| **options.apiHost** | `string` | Mangadex api host address. By default - `https://mangadex.org/api` |

Default `options` config:

```json
{
  "host": "https://mangadex.org",
  "apiHost": "https://mangadex.org/api"
}
```

---

## properties

`client.agent: `[Agent](#Agent)

Current [Agent](#Agent) instance.

---

## getManga

`Mangadex.getManga(mangaId, [params]): Promise<`[`Title`](#Title)`>`

Returns Mangadex manga data.

| Argument | Type | Description |
|-|-|-|
| **mangaId** | `number` | Manga id |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## getChapter

`Mangadex.getChapter(chapterId, [params]): Promise<`[`Chapter`](#Chapter)`>`

Returns Mangadex chapter data.

| Argument | Type | Description |
|-|-|-|
| **chapterId** | `number` \| `string` | Chapter id |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## search

`Mangadex.search(query, [params]): Promise<`[`SearchResult`](#SearchResult)`>`

***Authorization required***

Returns search result from Mangadex.

| Argument | Type | Description |
|-|-|-|
| **query** | `string` \| [SearchQuery](#SearchQuery) | When it's `string` search will be only **by title**. |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## quickSearch

`Mangadex.quickSearch(title, [params]): Promise<`[`SearchResult`](#SearchResult)`>`

***Authorization required***

Returns quick search result from Mangadex.

| Argument | Type | Description |
|-|-|-|
| **title** | `string` | Use [Quick Search](https://mangadex.cc/quick_search). Search only **by title** |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## getUser

`Mangadex.getUser(id, [params]): Promise<`[`User`](#User)`>`

Returns Mangadex user data.

| Argument | Type | Description |
|-|-|-|
| **id** | `number` \| `number` | User id |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## getGroup

`Mangadex.getGroup(id, [params]): Promise<`[`Group`](#Group)`>`

Returns Mangadex group data.

| Argument | Type | Description |
|-|-|-|
| **id** | `number` \| `number` | Group id |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## getHome

`Mangadex.getGroup([params]): Promise<`[`Home`](#Home)`>`

Returns Mangadex home page data.

| Argument | Type | Description |
|-|-|-|
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## getMe

`Mangadex.getMe([params]): Promise<`[`User`](#User)`>`

Returns user info associated with current session.

| Argument | Type | Description |
|-|-|-|
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## getMangaFollows

`Mangadex.getMangaFollows([params]): Promise<`[`MangaFollows[]`](#MangaFollows)`>`

***Authorization required***

Returns manga followed by user.

| Argument | Type | Description |
|-|-|-|
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## friendAdd

`Mangadex.friendAdd(userId, [params]): Promise<boolean>`

***Authorization required***

Sends 'Add friend' request to user.

| Argument | Type | Description |
|-|-|-|
| **userId** | `number` | User id. |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## mangaFollow

`Mangadex.mangaFollow(mangaId, type, [params]): Promise<boolean>`

***Authorization required***

Add manga to following list.

| Argument | Type | Description |
|-|-|-|
| **mangaId** | `number` | Manga id. |
| **type**  | `number` | Follow list type. Lists: 1 - Reading, 2 - Completed, 3 - On hold, 4 - Plan to read, 5 - Dropped, 6 - Re-reading |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

## mangaUnfollow

`Mangadex.mangaUnfollow(mangaId, [params]): Promise<boolean>`

***Authorization required***

Remove manga to following list.

| Argument | Type | Description |
|-|-|-|
| **mangaId** | `number` | Manga id. |
| **params** | `RequestOptions` | [RequestOptions](#RequestOptions) |

---

# Agent

## constructor

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

## properties

### getCredentials example

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

### loginCredentials example

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

## setSession

`Agent.setSession(id, expiration): void`

| Property | Type | Description |
|-|-|-|
| **id** | `string` | Session Id |
| **expiration** | `string` | Session expiration date |

---

## setPersistent

`Agent.setPersistent(token): void`

| Property | Type | Description |
|-|-|-|
| **token** | `string` | Session persistent id |

---

## login

`Agent.login(username, password, [rememberMe], [options]): Promise<boolean>`

| Property | Type | Description |
|-|-|-|
| **username** | `string` | User username |
| **password** | `string` | User password |
| **[rememberMe]** | `boolean` | Remember session. Default - `false` |
| **[options]** | `object` | Options object |
| **[options.baseUrl]** | `string` | Mangadex host url. Default - `https://mangadex.org` |

---

## **static** login

`Agent.login(username, password, [rememberMe], [options]): Promise<{ sessionId, expiration, [persistentId] }>`

| Property | Type | Description |
|-|-|-|
| **username** | `string` | User username |
| **password** | `string` | User password |
| **[rememberMe]** | `boolean` | Remember session. Default - `false` |
| **[options]** | `object` | Options object |
| **[options.baseUrl]** | `string` | Mangadex host url. Default - `https://mangadex.org` |

---

## loginWithSession

`Agent.loginWithSession(path): Promise<boolean>`

Loads and authenticate with saved in file session.

| Property | Type | Description |
|-|-|-|
| **path** | `string` | Path to stored session. |

---

## saveSession

`Agent.saveSession(path): Promise<boolean>`

Saves session in local file.

| Property | Type | Description |
|-|-|-|
| **path** | `string` | Path where to store session |

---

## setCookies

`Agent.setCookies(cookies): boolean`

Sets cookies for current agent instance.

| Property | Type | Description |
|-|-|-|
| **cookies** | `array` | Array of cookies from request. |

---

## getCookie

`Agent.getCookie(): string`

Return cookie for `Cookie` header in request.

---

## checkLogin

`Agent.checkLogin(): Promise<boolean>`

Return true if current session in agent instance is valid.

---

## call

`Agent.call(url, [options]): Promise<string | object>`

Calls Mangadex by given url with current session.

| Property | Type | Description |
|-|-|-|
| **url** | `string` | Url to endpoint without host. (Example: `/search` or `search`) |
| **options** | `RequestOptions` | [RequestOptions](#RequestOptions) with property `baseUrl` for calling host address (Example: `https://mangadex.org`). |

---

## callApi

`Agent.callApi(url, [options]): Promise<object>`

Calls Mangadex Api by given path.

| Property | Type | Description |
|-|-|-|
| **url** | `string` | Url to endpoint without host. (Example: `/search` or `search`) |
| **options** | `RequestOptions` | [RequestOptions](#RequestOptions) with property `baseUrl` for calling host address (Example: `https://mangadex.org/api`). |

---

## callAjaxAction

`Agent.callAjaxAction(params, [options]): Promise<`[RequestResult](#RequestResult)`>`

Calls Mangadex ajax action with given params.

| Property | Type | Description |
|-|-|-|
| **params** | `object` | key-value params for ajax action. |
| **options** | `RequestOptions` | [RequestOptions](#RequestOptions) with property `baseUrl` for calling host address (Example: `https://mangadex.org/api`). |

---

# Types

Types was removed from docs.  
Use typings in your favorite code editor or use [typings](https://github.com/ejnshtein/mangadex-api/tree/dev/typings) folder.

# Contact

[My telegram](https://t.me/ejnshtein) and a [group](https://t.me/nyaasi_chat) where you can as your questions or suggest something. 

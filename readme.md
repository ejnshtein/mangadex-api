# Mangadex-api

[![NPM Version](https://img.shields.io/npm/v/mangadex-api.svg?style=flat-square)](https://www.npmjs.com/package/mangadex-api)
[![npm downloads](https://img.shields.io/npm/dm/mangadex-api.svg?style=flat-square)](http://npm-stat.com/charts.html?package=mangadex-api)
[![License](https://img.shields.io/npm/l/mangadex-api?style=flat-square)](https://github.com/ejnshtein/mangadex-api)
[![codecov](https://codecov.io/gh/ejnshtein/mangadex-api/branch/master/graph/badge.svg)](https://codecov.io/gh/ejnshtein/mangadex-api)

This is [Mangadex](https://mangadex.org) website api wrapper.

>[WIP on V5 version](https://github.com/ejnshtein/mangadex-api/issues/34)


## Installation

```bash
npm i mangadex-api

# or

yarn add mangadex-api
```


## Example

```js
// In V5 Mangadex switched id type from number to string.
// So if you need to convert it, call the convertLegacyId method.
// Soon will be added to usual methods, maybe.

Mangadex.convertLegacyId([12], 'group')
  .then((result) => {
    if (result.result === 'error') {
      console.log(
        `Got error on convertLegacyId request! ${result.errors
          .map((err) => err.title)
          .join(', ')}`
      )
      return
    }

    const { newId } = result.data.attributes

    console.log(`New group id: ${newId}`)
  })

Mangadex.manga
  .getManga(
    'c26269c7-0f5d-4966-8cd5-b79acb86fb7a',
    {
      // will fetch additionally scanlation_group, artist, author attributes
      withRelationShips: true
    }
  )
  .then(({ result, data, errors }) => {
    if (result === 'error') {
      // oh no! something went wrong!
      // here we can handle errors array.
    }

    const { title, originalLanguage } = data.attributes
    console.log(`Manga ${title.en} published in ${originalLanguage}`)

    Mangadex.manga
      .getMangaFeed('c26269c7-0f5d-4966-8cd5-b79acb86fb7a', {
        limit: 10
      })
      .then(({ results: chapters }) => {
        console.log(`Manga ${title.en} has ${chapters.length} chapters`)
        const { volume, chapter } = chapters[0].data.attributes
        console.log(`Latest chapter: Vol ${volume} Ch ${chapter}`)
      })
  })

Mangadex.chapter.getChapter(8857).then((chapter) => {
  if (chapter.result === 'error') {
    console.log(
      `Got errors on chapter request! ${chapter.errors
        .map((err) => err.title)
        .join(', ')}`
    )
    return
  }
  console.log(
    `Chapter title is "${chapter.data.attributes.title}" and it is ${chapter.data.attributes.chapter} chapter from ${chapter.volume} volume.`
  )
})

// currently requires authorization
Mangadex.manga.search({ title: 'senko' }).then(({ total }) => {
  console.log(`Found ${total} titles.`)
})
// Search with NSFW results
Mangadex.manga
  .search({
    title: 'gotoubun',
    contentRating: ['pornographic']
  })
  .then((result) => {
    console.log(`Found ${result.results.length} hentai manga (☞ ͡ ͡° ͜ ʖ ͡ ͡°)☞`)
  })

Mangadex.group.getGroup(12).then((group) => {
  if (group.result === 'error') {
    console.log(
      `Got errors from group request! ${group.errors
        .map((err) => err.title)
        .join(', ')}`
    )
    return
  }
  const { name, members } = group.data.attributes
  console.log(`Group ${name} has ${members} members`)
})
```

## Authorization example

```js
const { Mangadex } = require('mangadex-api')

const client = new Mangadex()

const loginResult = await client.auth.login('username', 'password')

if (loginResult.result === 'error') {
  // oh no! it's login error!
}

const result = await client.manga.search('To Be Winner')

console.log(result)
```

## Cached session example

```js
// first you must save your session somewhere

const loginResult = await client.auth.login('username', 'password')

if (loginResult.result === 'error') {
  // oh no! it's login error!
}

await client.agent.saveSession('/path/to/session'))

// now we can use it

await client.agent.loginWithSession('/path/to/session')

const me = await client.user.getMe()

console.log(me)
```

## API

API section is available on the [website](https://ejnshtein.github.io/mangadex-api/).


## Additional resources
- [mangadex-heroku](https://github.com/ejnshtein/mangadex-heroku) is a [GraphQL](https://graphql.org/) public endpoint. (not updated to V5 yet)  
Supports caching (in memory) and all public MD-API's that doesn't require authorization. ([playground](http://mangadex.herokuapp.com/graphql))
- [Example webapp](https://codesandbox.io/s/condescending-kirch-u71ji?file=/src/index.js) that uses mangadex-heroku for API calls. (not updated to V5 yet)

---

## Contact

[My telegram](https://t.me/ejnshtein) and a [group](https://t.me/nyaasi_chat) where you can ask your questions or suggest something.

module.exports = (link) => {
  return Object.keys(link).map(el => getLink(el, link[el]))
}

function getLink (key, value) {
  const title = linkKeys[key] ? linkKeys[key].title : key
  const url = linkKeys[key] ? linkKeys[key].url + value : value
  return {
    title,
    url
  }
}
const linkKeys = {
  'amz': {
    title: 'Amazon.co.jp',
    url: ''
  },
  'mal': {
    title: 'MyAnimeList',
    url: 'https://myanimelist.com/manga/'
  },
  'nu': {
    title: 'NovelUpdates',
    url: 'https://www.novelupdates.com/series/'
  },
  'bw': {
    title: 'Bookwalker',
    url: 'https://bookwalker.jp/'
  },
  'raw': {
    title: 'Raw',
    url: ''
  },
  'mu': {
    title: 'MangaUpdates',
    url: 'https://www.mangaupdates.com/series.html?id='
  },
  'ebj': {
    title: 'eBookJapan',
    url: ''
  },
  'engtl': {
    title: 'Official English',
    url: ''
  }
}

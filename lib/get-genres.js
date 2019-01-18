const genresData = [{
  id: 1,
  label: '4-Koma'
}, {
  id: 2,
  label: 'Action'
}, {
  id: 3,
  label: 'Adventure'
}, {
  id: 4,
  label: 'Award Winning'
}, {
  id: 5,
  label: 'Comedy'
}, {
  id: 6,
  label: 'Cooking'
}, {
  id: 7,
  label: 'Doujinshi'
}, {
  id: 8,
  label: 'Drama'
}, {
  id: 9,
  label: 'Ecchi'
}, {
  id: 10,
  label: 'Fantasy'
}, {
  id: 11,
  label: 'Gender Bender'
}, {
  id: 12,
  label: 'Harem'
}, {
  id: 13,
  label: 'Historical'
}, {
  id: 14,
  label: 'Horror'
}, {
  id: 15,
  label: 'Josei'
}, {
  id: 16,
  label: 'Martial Arts'
}, {
  id: 17,
  label: 'Mecha'
}, {
  id: 18,
  label: 'Medical'
}, {
  id: 19,
  label: 'Music'
}, {
  id: 20,
  label: 'Mystery'
}, {
  id: 21,
  label: 'Oneshot'
}, {
  id: 22,
  label: 'Psychological'
}, {
  id: 23,
  label: 'Romance'
}, {
  id: 24,
  label: 'School Life'
}, {
  id: 25,
  label: 'Sci-Fi'
}, {
  id: 26,
  label: 'Seinen'
}, {
  id: 27,
  label: 'Shoujo'
}, {
  id: 28,
  label: 'Shoujo Ai'
}, {
  id: 29,
  label: 'Shounen'
}, {
  id: 30,
  label: 'Shounen Ai'
}, {
  id: 31,
  label: 'Slice of Life'
}, {
  id: 32,
  label: 'Smut'
}, {
  id: 33,
  label: 'Sports'
}, {
  id: 34,
  label: 'Supernatural'
}, {
  id: 35,
  label: 'Tragedy'
}, {
  id: 36,
  label: 'Webtoon'
}, {
  id: 37,
  label: 'Yaoi'
}, {
  id: 38,
  label: 'Yuri'
}, {
  id: 39,
  label: '[no chapters]'
}, {
  id: 40,
  label: 'Game'
}, {
  id: 41,
  label: 'Isekai'
}]

module.exports = (genre) => {
  const genres = Array.isArray(genre) ? genre : [genre]
  const res = genresData.filter(el => genres.some(genreId => el.id === Number.parseInt(genreId)))
  if (res.length >= 2) {
    return res
  } else {
    return genres.map(genre => ({
      id: genre,
      label: `Genre#${genre}`
    }))
  }
}

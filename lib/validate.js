const requiredMangaKeys = ['cover_url', 'description', 'title', 'artist', 'author', 'status', 'genres', 'last_chapter', 'lang_name', 'lang_flag', 'hentai', 'links']
const requiredChapterKeys = ['id', 'timestamp', 'hash', 'volume', 'chapter', 'title', 'lang_name', 'lang_code', 'manga_id', 'group_id', 'group_id_2', 'group_id_3', 'comments', 'server', 'page_array', 'long_strip', 'status']
module.exports = {
  manga (manga) {
    const missedKeys = manga && manga.manga && Object.keys(manga.manga).filter(key => !requiredMangaKeys.includes(key))
    if (missedKeys && missedKeys.length) {
      return {
        ok: false,
        missed: missedKeys
      }
    } else {
      return {
        ok: true
      }
    }
  },
  chapter (chapter) {
    const missedKeys = chapter && Object.keys(chapter).filter(key => !requiredChapterKeys.includes(key))
    if (missedKeys && missedKeys.length) {
      return {
        ok: false,
        missed: missedKeys
      }
    } else {
      return {
        ok: true
      }
    }
  }
}

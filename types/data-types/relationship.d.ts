/**
 * Manga resource
 */
export type MangaResource = 'manga'

/**
 * Chapter resource
 */
export type ChapterResource = 'chapter'

/**
 * A Cover Art for a manga
 *
 * Note, that on manga resources you get only one cover_art resource relation marking the primary cover if there are more than one. By default this will be the latest volume's cover art. If you like to see all the covers for a given manga, use the cover search endpoint for your mangaId and select the one you wish to display.
 */
export type CoverArtResource = 'cover_art'

/**
 * Author resource
 */
export type AuthorResource = 'author'

/**
 * Author resource (drawers only)
 */
export type ArtistResource = 'artist'

/**
 * ScanlationGroup resource
 */
export type ScanlationGroupResource = 'scanlation_group'

/**
 * Tag resource
 */
export type TagResource = 'tag'

/**
 * User resource
 */
export type UserResource = 'user'

/**
 * CustomList resource
 */
export type CustomListResource = 'custom_list'

export type RelationshipType =
  | MangaResource
  | ChapterResource
  | CoverArtResource
  | AuthorResource
  | ArtistResource
  | ScanlationGroupResource
  | TagResource
  | UserResource
  | CustomListResource

export interface Relationship {
  id: string
  type: RelationshipType
}

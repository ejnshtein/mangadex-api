/**
 * Manga is still going on
 */
export type Ongoing = 'ongoing'

/**
 * Manga is completed
 */
export type Completed = 'completed'

/**
 * Manga is paused
 */
export type Hiatus = 'hiatus'

/**
 * Manga has been cancelled
 */
export type Cancelled = 'cancelled'

export type MangaStatus = Ongoing | Completed | Hiatus | Cancelled

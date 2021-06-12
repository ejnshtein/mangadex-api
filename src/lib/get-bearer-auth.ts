import { Session } from '../../types/agent'

export const getBearerTokenHeader = (
  session: Session
): Record<string, string> => ({
  Authorization: `Bearer ${session.session}`
})

export const getBearerRefreshTokenHeader = (
  session: Session
): Record<string, string> => ({
  Authorization: `Bearer ${session.refresh}`
})

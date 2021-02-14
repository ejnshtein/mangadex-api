import { Agent } from '../jest/get-test-client'
import path from 'path'
import { User } from '../types/mangadex'

/**
 * TODO add more tests
 */
describe('agent api', () => {
  it('should login, save session and login from saved session and logout', async () => {
    const client = new Agent()

    const isLoginOk = await client.login(
      process.env.MANGADEX_USERNAME,
      process.env.MANGADEX_PASSWORD,
      true
    )

    expect(isLoginOk).toEqual(true)

    const sessionPath = path.join(__dirname, '..', 'jest-session')

    const isSaveSessionOk = await client.saveSession(sessionPath)

    expect(isSaveSessionOk).toEqual(true)

    const newClient = new Agent()

    const isLoginFromSavedSessionOk = await newClient.loginWithSession(
      sessionPath
    )

    expect(isLoginFromSavedSessionOk).toEqual(true)

    const { username } = await newClient.callApi<User>('user/me')

    expect(username).toEqual(process.env.MANGADEX_USERNAME)

    const isLogoutOk = await newClient.logout()

    expect(isLogoutOk).toEqual(true)
  })
})

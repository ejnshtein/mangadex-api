import { Mangadex } from '../jest/get-test-client'
import path from 'path'
import { UserResponse } from '../types/data-types/user'

/**
 * TODO add more tests
 */
describe('agent api', () => {
  it('should login, save session and login from saved session and logout', async () => {
    const client = new Mangadex()

    const loginResult = await client.auth.login(
      process.env.MANGADEX_USERNAME,
      process.env.MANGADEX_PASSWORD
    )

    expect(loginResult.result).toEqual('ok')

    const sessionPath = path.join(__dirname, '..', 'jest-session')

    const isSaveSessionOk = await client.agent.saveSession(sessionPath)

    expect(isSaveSessionOk).toEqual(true)

    const newClient = new Mangadex()

    const isLoginFromSavedSessionOk = await newClient.agent.loginWithSession(
      sessionPath
    )

    expect(isLoginFromSavedSessionOk).toEqual(true)

    const user = await newClient.user.getMe()

    expect(user.result).toEqual('ok')

    expect(user.data.attributes.username).toEqual(process.env.MANGADEX_USERNAME)

    const logoutResult = await newClient.auth.logout()

    expect(logoutResult.result).toEqual('ok')
  })
})

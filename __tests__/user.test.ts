import { getClient } from '../jest/get-test-client'

describe('user api', () => {
  it('should get me', async () => {
    const client = await getClient()
    const { username } = await client.user.getMe()

    expect(username).toEqual(process.env.MANGADEX_USERNAME)
  })
})

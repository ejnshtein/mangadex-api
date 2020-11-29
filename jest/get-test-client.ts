import { Mangadex } from '../src'
import fs from 'fs'
import path from 'path'
export { Mangadex, Agent } from '../src'

require('dotenv').config('../.env')

const sessionPath = path.join(__dirname, '..', 'session')

const pathExists = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

export const getClient = async (): Promise<Mangadex> => {
  const client = new Mangadex()
  if (await pathExists(sessionPath)) {
    await client.agent.loginWithSession(sessionPath)
  } else {
    await client.agent.login(
      process.env.MANGADEX_USERNAME,
      process.env.MANGADEX_PASSWORD,
      true
    )
    await client.agent.saveSession(sessionPath)
  }
  return client
}

export const getInstanceClient = (): typeof Mangadex => {
  return Mangadex
}

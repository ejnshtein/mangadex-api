const { Mangadex } = require('../dist')
const fs = require('fs')
const path = require('path')
require('dotenv').config('../.env')

const sessionPath = path.join(__dirname, '..', 'session')

const pathExists = async (path) => {
  try {
    await fs.promises.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

const getTestClient = async () => {
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

module.exports = getTestClient

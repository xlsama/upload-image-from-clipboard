import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

const TOKEN_PATH = path.resolve(homedir(), '.config', 'upload-image.json')

export function setTokenToLocal(token: string) {
  writeFileSync(TOKEN_PATH, JSON.stringify({ token }))
}

export function getTokenFromLocal(): string | undefined {
  try {
    const { token } = JSON.parse(readFileSync(TOKEN_PATH, { encoding: 'utf-8', flag: 'a+' }))
    return token
  } catch (err) {
    console.log('token does not exist, you can run "ui --help"')
  }
}

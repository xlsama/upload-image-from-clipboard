#!/usr/bin/env node

import { version } from '../package.json'
import { program } from 'commander'
import { uploadImage } from './upload'
import { readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import path from 'node:path'

const TOKEN_PATH = path.resolve(homedir(), '.config', 'upload-image.json')

program.version(version)

program.option('-t, --token <token>', 'save token to local')

program.parse()

const { token } = program.opts()

if (token) {
  setTokenToLocal()
} else {
  const token = getTokenFromLocal()
  token && uploadImage(token)
}

function setTokenToLocal() {
  writeFileSync(TOKEN_PATH, JSON.stringify({ token }))
}

function getTokenFromLocal(): string | undefined {
  try {
    const { token } = JSON.parse(
      readFileSync(TOKEN_PATH, { encoding: 'utf-8', flag: 'a+' })
    )
    return token
  } catch (err) {
    console.log('token does not exist, you can run "ui --help"')
  }
}

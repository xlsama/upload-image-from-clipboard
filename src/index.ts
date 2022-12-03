#!/usr/bin/env node

import { version } from '../package.json'
import { program } from 'commander'
import { uploadImage } from './upload'
import { getTokenFromLocal, setTokenToLocal } from './token'

program.version(version)

program.option('-t, --token <token>', 'save token to local')

program.parse()

const { token } = program.opts()

if (token) {
  setTokenToLocal(token)
} else {
  const token = getTokenFromLocal()
  token && uploadImage(token)
}

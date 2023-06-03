#!/bin/env node

import { version } from '../package.json'
import { program } from 'commander'
import { uploadImage, setTokenToLocal } from '.'

program.version(version)

program.option('-t, --token <token>', 'save token to local')

program.parse()

const { token } = program.opts()

if (token) {
  setTokenToLocal(token)
} else {
  uploadImage()
}

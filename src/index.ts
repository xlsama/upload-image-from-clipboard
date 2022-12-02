#!/usr/bin/env node

import path from 'node:path'
import { exec } from 'node:child_process'
import { uploadToSMMS } from './api'
import { SMMSUploadResponseCode } from './types'

function getClipboardImagePath(): Promise<string> {
  return new Promise(resolve => {
    const pngpasteCommand = path.resolve(__dirname, 'lib/pngpaste')
    const name = 'image.png'

    exec(`${pngpasteCommand} ${name}`, (...args) => {
      const stderr = args.at(-1)
      if (stderr) {
        console.log(stderr)
        return
      }

      resolve(path.resolve(name))
    })
  })
}

async function uploadImage() {
  const path = await getClipboardImagePath()
  const data = await uploadToSMMS({
    path,
    authorization: 'R3SB68a7pSGXdUVsuz9GIU2fMMXE1WNd'
  })

  switch (data.code) {
    case SMMSUploadResponseCode.Success:
      exec(`echo ${data.data.url} | pbcopy`)
      break
    case SMMSUploadResponseCode.Repeated:
      exec(`echo ${data.images} | pbcopy`)
      break
    default:
      break
  }
}

uploadImage()

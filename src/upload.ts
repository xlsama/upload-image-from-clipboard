import path from 'node:path'
import { exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { uploadToSMMS } from './api'
import { getTokenFromLocal } from './token'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

function getClipboardImagePath(): Promise<string> {
  return new Promise(resolve => {
    const pngpasteCommand = path.resolve(__dirname, 'lib/pngpaste')

    const imagePath = path.resolve(__dirname, 'image.png')

    exec(`chmod +x ${pngpasteCommand}`, () => {
      exec(`${pngpasteCommand} ${imagePath}`, (...args) => {
        const stderr = args.at(-1)
        if (stderr) {
          console.log(stderr)
          return
        }

        resolve(imagePath)
      })
    })
  })
}

export async function uploadImage() {
  const token = getTokenFromLocal()
  if (!token) return

  const path = await getClipboardImagePath()
  const data = await uploadToSMMS({ path, token })

  if (!data.success) {
    console.log(data.message)
    return
  }

  exec(`echo ${data.data.url} | pbcopy`, () =>
    console.log('Copied to clipboard')
  )
}

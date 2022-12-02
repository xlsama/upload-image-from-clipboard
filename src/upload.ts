import path from 'node:path'
import { exec } from 'node:child_process'
import { uploadToSMMS } from './api'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(import.meta.url)

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

      resolve(path.resolve(__dirname, '..', name))
    })
  })
}

export async function uploadImage(token: string) {
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

import fetch from 'node-fetch'
import FormData from 'form-data'
import fs from 'node:fs'
import { exec } from 'node:child_process'
import { SMMSUploadRequest, SMMSUploadResponse } from './types'

// https://doc.sm.ms/#api-Image-Upload
export function uploadToSMMS({
  path,
  authorization
}: SMMSUploadRequest): Promise<SMMSUploadResponse> {
  return new Promise(async resolve => {
    const form = new FormData()
    form.append('smfile', fs.createReadStream(path))

    const res = await fetch('https://smms.app/api/v2/upload', {
      method: 'post',
      headers: { Authorization: authorization },
      body: form
    })

    exec(`rm ${path}`)

    if (res.ok) {
      const data = await res.json()
      resolve(data as SMMSUploadResponse)
    }
  })
}

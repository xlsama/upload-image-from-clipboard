import got from 'got'
import FormData from 'form-data'
import fs from 'node:fs'
import { exec } from 'node:child_process'
import { SMMSUploadRequest, SMMSUploadResponse } from './types'

// https://doc.sm.ms/#api-Image-Upload
export function uploadToSMMS({ path, token }: SMMSUploadRequest): Promise<SMMSUploadResponse> {
  return new Promise(async resolve => {
    const form = new FormData()
    form.append('smfile', fs.createReadStream(path))

    const res = await got.post('https://smms.app/api/v2/upload', {
      headers: { Authorization: token },
      body: form,
    })

    exec(`rm "${path}"`)

    const data = JSON.parse(res.body)

    resolve(data as SMMSUploadResponse)
  })
}

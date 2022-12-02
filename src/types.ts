export interface SMMSUploadRequest {
  path: string
  token: string
}

export interface SMMSUploadResponse {
  success: boolean
  code: string
  message: string
  data: {
    file_id: number
    width: number
    height: number
    filename: string
    storename: string
    size: number
    path: string
    hash: string
    url: string
    delete: string
    page: string
  }
  images?: string
  RequestId: string
}

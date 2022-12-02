export interface SMMSUploadRequest {
  path: string
  authorization: string
}

export enum SMMSUploadResponseCode {
  Success = 'success',
  Repeated = 'image_repeated'
}

export interface SMMSUploadResponse {
  success: boolean
  code: SMMSUploadResponseCode
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

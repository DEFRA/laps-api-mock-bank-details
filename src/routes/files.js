import { getFilesListByLocalAuthority } from '../handler/file/getFilesListByLocalAuthority.js'
import { getFileById } from '../handler/file/getFileById.js'

const files = [
  {
    method: 'GET',
    path: '/api/sn_gsm/laps_documents/{localAuthority}',
    handler: (request, h) => getFilesListByLocalAuthority(request, h)
  },
  {
    method: 'GET',
    path: '/api/now/attachment/{id}/file',
    handler: (request, h) => getFileById(request, h)
  }
]

export { files }

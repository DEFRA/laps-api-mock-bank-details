// import { getBankDetails } from '../handler/bankDetails/get.js'
import { getFilesListByLocalAuthority } from '../handler/file/getFilesListByLocalAuthority.js'
import { getFileById } from '../handler/file/getFileById.js'

const files = [
  {
    method: 'GET',
    path: '/file/metadata/{localAuthority}',
    handler: (request, h) => getFilesListByLocalAuthority(request, h)
  },
  {
    method: 'GET',
    path: '/file/{id}',
    handler: (request, h) => getFileById(request, h)
  }
]

export { files }

import Boom from '@hapi/boom'
import { documents } from './data.js'

const getFileById = (request, h) => {
  const localAuthority = request.params.id
  if (localAuthority === 'invalid') throw Boom.badRequest('Invalid ID')
  const documentName = getFileNameById(localAuthority)

  return h.file(`./src/handler/file/${documentName}`, {
    mode: 'attachment', // forces download
    filename: documentName
  })
}

function getFileNameById(id) {
  const doc = documents.find((document) => document.sysId === id)
  return doc ? doc.fileName : null // Returns null if no document found
}

export { getFileById }

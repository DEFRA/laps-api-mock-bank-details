import Boom from '@hapi/boom'
import { documents } from './data.js'

const getFilesListByLocalAuthority = (request, h) => {
  const localAuthority = request.params.localAuthority

  if (localAuthority === 'invalid') throw Boom.badRequest('Invalid Authority')

  if (localAuthority === '32e924f8-fe8e-f011-b4cc-00224884d3e7') {
    return h.response([])
  }
  return h.response(documents)
}

export { getFilesListByLocalAuthority }

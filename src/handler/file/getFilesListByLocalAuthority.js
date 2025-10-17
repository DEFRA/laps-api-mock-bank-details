import Boom from '@hapi/boom'
import { documents } from './data.js'

const getFilesListByLocalAuthority = (request, h) => {
  const localAuthority = request.params.localAuthority

  if (localAuthority === 'invalid') throw Boom.badRequest('Invalid Authority')

  return h.response(documents)
}

export { getFilesListByLocalAuthority }

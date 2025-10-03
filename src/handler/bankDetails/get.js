import Boom from '@hapi/boom'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const getBankDetails = async (request, h) => {
  const localAuthority = request.params.localAuthority
  const bankDetailsData = JSON.parse(
    readFileSync(join(__dirname, '../../data/bankDetails.json'), 'utf8')
  )

  if (localAuthority === 'invalid') throw new Error('Invalid Authority')

  const response = bankDetailsData[localAuthority]

  if (!response) {
    return Boom.notFound('No bank details found for that local authority')
  }

  return h.response(response)
}

export { getBankDetails }

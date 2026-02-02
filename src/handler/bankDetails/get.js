import Boom from '@hapi/boom'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { encryptBankDetails } from '../../common/helpers/encrypt-bank-details.js'
import { config } from '../../config.js'

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

  // Encrypt the response if encryption key is available
  const encryptionKey = config.get('fssEncryptionKey')
  if (encryptionKey) {
    try {
      const encryptedData = encryptBankDetails(
        JSON.stringify(response),
        encryptionKey
      )
      return h.response({
        result: {
          response_data: encryptedData
        }
      })
    } catch (encryptErr) {
      request.logger.error(
        `Error encrypting bank details: ${JSON.stringify(encryptErr)}`
      )
      throw Boom.internal('Failed to encrypt bank details')
    }
  }

  // Return unencrypted data if no encryption key is configured
  return h.response({
    result: response
  })
}

export { getBankDetails }

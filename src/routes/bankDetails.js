import { getBankDetails } from '../handler/bankDetails/get.js'
import { putBankDetails } from '../handler/bankDetails/put.js'

const bankDetails = [
  {
    method: ['GET', 'PUT'],
    path: '/bank-details/{localAuthority}',
    handler: (request, h) => {
      if (request.method === 'get') {
        return getBankDetails(request, h)
      }

      if (request.method === 'put') {
        return putBankDetails(request, h)
      }
    }
  }
]

export { bankDetails }

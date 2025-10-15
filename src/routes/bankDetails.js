import { getBankDetails } from '../handler/bankDetails/get.js'
import { putBankDetails } from '../handler/bankDetails/put.js'
import { createBankDetails } from '../handler/bankDetails/create-bank-details.js'

const bankDetails = [
  {
    method: ['GET'],
    path: '/bank-details/{localAuthority}',
    handler: (request, h) => getBankDetails(request, h)
  },
  {
    method: ['PUT'],
    path: '/bank-details/{localAuthority}',
    handler: (request, h) => putBankDetails(request, h)
  },
  {
    method: ['POST'],
    path: '/bank-details',
    handler: (request, h) => createBankDetails(request, h)
  }
]

export { bankDetails }

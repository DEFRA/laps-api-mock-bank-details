import { getBankDetails } from '../handler/bankDetails/get.js'
import { putBankDetails } from '../handler/bankDetails/put.js'
import { createBankDetails } from '../handler/bankDetails/create-bank-details.js'

const bankDetails = [
  {
    method: ['GET'],
    path: '/api/sn_gsm/bank_details/{localAuthority}',
    handler: (request, h) => getBankDetails(request, h)
  },
  {
    method: ['PUT'],
    path: '/api/sn_gsm/bank_details/confirm_bank_details',
    handler: (request, h) => putBankDetails(request, h)
  },
  {
    method: ['POST'],
    path: '/api/sn_gsm/bank_details/update_bank_details',
    handler: (request, h) => createBankDetails(request, h)
  }
]

export { bankDetails }

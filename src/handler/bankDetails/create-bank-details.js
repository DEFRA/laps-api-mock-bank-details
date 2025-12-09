import Boom from '@hapi/boom'

const createBankDetails = (request, h) => {
  const payload = request.payload
  if (!payload) {
    throw Boom.badRequest('No payload provided')
  }

  return h
    .response({
      id: '12345-abcde-67890-fghij',
      accountNumber: payload.accountNumber,
      accountName: payload.accountName,
      localAuthority: payload.localAuthority,
      sortCode: payload.sortCode,
      confirmed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .code(201)
}

export { createBankDetails }

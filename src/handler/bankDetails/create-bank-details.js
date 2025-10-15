import Boom from '@hapi/boom'

const createBankDetails = (request, h) => {
  const payload = request.payload
  if (!payload) {
    throw Boom.badRequest('No payload provided')
  }

  return h
    .response({
      id: '12345-abcde-67890-fghij',
      accountNumber: '094785923',
      accountName: 'Defra Test',
      sortCode: '09-03-023',
      confirmed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .code(201)
}

export { createBankDetails }

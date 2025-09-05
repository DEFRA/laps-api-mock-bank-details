const putBankDetails = (request, h) => {
  const payload = request.payload

  return h.response({
    id: '12345-abcde-67890-fghij',
    accountNumber: '094785923',
    accountName: 'Defra Test',
    sortCode: '09-03-023',
    confirmed: payload.confirmed,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export { putBankDetails }

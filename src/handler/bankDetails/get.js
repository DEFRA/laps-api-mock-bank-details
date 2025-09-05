const getBankDetails = (request, h) => {
  return h.response({
    id: '12345-abcde-67890-fghij',
    accountNumber: '094785923',
    accountName: 'Defra Test',
    sortCode: '09-03-023',
    confirmed: true,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export { getBankDetails }

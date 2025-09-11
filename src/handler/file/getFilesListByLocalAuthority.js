import Boom from '@hapi/boom'

const getFilesListByLocalAuthority = (request, h) => {
  const localAuthority = request.params.localAuthority

  if (localAuthority === 'invalid') throw Boom.badRequest('Invalid Authority')

  return h.response([
    {
      id: '12345-abcde-67890-fghij',
      fileName: 'file_report_2024.pdf',
      localAuthority: 'Newcastle City Council',
      financialYear: '2024',
      quarter: 'Q2',
      creationDate: new Date(),
      documentType: 'grant',
      language: 'EN'
    }
  ])
}

export { getFilesListByLocalAuthority }

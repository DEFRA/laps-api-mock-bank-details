import Boom from '@hapi/boom'

const getFileById = (request, h) => {
  const localAuthority = request.params.id

  if (localAuthority === 'invalid') throw Boom.badRequest('Invalid ID')

  return h.file('./src/handler/file/file_report_2024.pdf', {
    mode: 'attachment', // forces download
    filename: 'file_report_2024.pdf'
  })
}

export { getFileById }

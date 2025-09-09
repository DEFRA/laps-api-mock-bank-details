import { health } from '../routes/health.js'
import { bankDetails } from '../routes/bankDetails.js'

const router = {
  plugin: {
    name: 'router',
    register: (server, _options) => {
      server.route([health, bankDetails])
    }
  }
}

export { router }

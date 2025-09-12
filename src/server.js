import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import Inert from '@hapi/inert'
import { secureContext } from '@defra/hapi-secure-context'

import { config } from './config.js'
import { router } from './plugins/router.js'
import { requestLogger } from './common/helpers/logging/request-logger.js'
import { failAction } from './common/helpers/fail-action.js'
import { pulse } from './common/helpers/pulse.js'
import { requestTracing } from './common/helpers/request-tracing.js'
import { setupProxy } from './common/helpers/proxy/setup-proxy.js'

async function createServer() {
  setupProxy()
  const server = Hapi.server({
    host: config.get('host'),
    port: config.get('port'),
    routes: {
      validate: {
        options: {
          abortEarly: false
        },
        failAction
      },
      security: {
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: false
        },
        xss: 'enabled',
        noSniff: true,
        xframe: true
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  // Register a custom auth scheme
  server.auth.scheme('api-key', () => {
    return {
      authenticate: async (request, h) => {
        const apiKey = request.headers['x-api-key']
        const validApiKeys = ['some-api-key']

        if (!apiKey || !validApiKeys.includes(apiKey)) {
          throw Boom.unauthorized('Invalid API Key')
        }

        // credentials object gets attached to request.auth
        return h.authenticated({
          credentials: { apiKey, user: 'API User' }
        })
      }
    }
  })

  server.auth.strategy('default', 'api-key')
  server.auth.default('default')

  await server.register(Inert)

  // Hapi Plugins:
  // requestLogger  - automatically logs incoming requests
  // requestTracing - trace header logging and propagation
  // secureContext  - loads CA certificates from environment config
  // pulse          - provides shutdown handlers
  // router         - routes used in the app
  await server.register([
    requestLogger,
    requestTracing,
    secureContext,
    pulse,
    router
  ])

  return server
}

export { createServer }

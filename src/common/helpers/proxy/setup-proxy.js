import { ProxyAgent, setGlobalDispatcher } from 'undici'

import { createLogger } from '../logging/logger.js'
import { config } from '../../../config.js'

const logger = createLogger()

/**
 * If HTTP_PROXY is set setupProxy() will enable it globally
 * for a number of http clients.
 * Node Fetch will still need to pass a ProxyAgent in on each call.
 */
export function setupProxy() {
  const proxyUrl = config.get('httpProxy')

  if (proxyUrl) {
    logger.info('setting up global proxies')

    // Undici proxy (Node.js fetch)
    setGlobalDispatcher(new ProxyAgent(proxyUrl))

    // global-agent via standard env vars (no import needed)
    process.env.HTTP_PROXY = proxyUrl
    process.env.HTTPS_PROXY = proxyUrl
    process.env.NO_PROXY = 'localhost,127.0.0.1'
  }
}

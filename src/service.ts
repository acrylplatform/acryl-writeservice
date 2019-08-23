import { logger } from './utils/logging';
import { AcrylBlockchainService } from './services/AcrylBlockchainService';

async function init() {
  const service = new AcrylBlockchainService();

  service.start();

  return service;
}

init()
  .then(service => !!service || process.exit(0))
  .catch(error => logger.error(error));

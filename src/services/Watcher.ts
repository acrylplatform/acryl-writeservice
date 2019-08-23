import { logger } from '../utils/logging';

export class WatcherService {
  static STATUS_STOPPED = 'stopped';
  static STATUS_STARTED = 'started';

  timer: any = null;
  interval: number;
  locked: boolean = false;
  logger: any;
  status = WatcherService.STATUS_STOPPED;

  constructor(interval = 10000) {
    this.logger = logger;
    this.interval = interval;
  }

  start() {
    if (this.status !== WatcherService.STATUS_STOPPED) return;

    this.status = WatcherService.STATUS_STARTED;
    this.logger.info(`${this.getName()} started.`);

    this.timer = setInterval(async () => {
      if (this.status !== WatcherService.STATUS_STOPPED) await this.cycle();
    }, this.interval);
  }

  stop() {
    if (this.status !== WatcherService.STATUS_STARTED) return;

    this.status = WatcherService.STATUS_STOPPED;
    this.logger.info(`${this.getName()} stopped.`);

    clearInterval(this.timer);
  }

  getName() {
    return this.constructor.name;
  }

  async cycle() {
    if (this.locked) {
      this.logger.warn('Previous cycle was not completed');
      return;
    }

    this.locked = true;

    try {
      // this.logger.info('Running new cycle');
      await this.run();
    } catch (error) {
      this.logger.error(error, 'Unable to complete cycle');
    } finally {
      this.locked = false;
    }
  }

  async run() {
    throw new Error(`Method not implemented: ${this.run.name}`);
  }
}

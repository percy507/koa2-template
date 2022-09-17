import log4js from 'log4js';
import path from 'path';

import { logDir } from '@/config';

log4js.configure({
  appenders: {
    custom: {
      type: 'dateFile',
      filename: path.resolve(logDir, 'my-log.log'),
      pattern: '.HH:mm',
    },
  },
  categories: { default: { appenders: ['custom'], level: 'info' } },
  pm2: false,
});

const logger = log4js.getLogger();
// logger.level = config.logger.level;
logger.level = 'all';

export default (): KoaMiddleware => {
  return async (ctx, next) => {
    const { method, path, origin, query, body, headers, ip } = ctx.request;
    const data: any = {
      method,
      path,
      origin,
      query,
      body,
      ip,
      headers,
    };

    await next();

    const { status } = ctx;

    data.status = status;
    data.result = ctx.body || 'no content';

    if (ctx.body && ctx.body.code !== 0) {
      logger.error(JSON.stringify(data));
    } else {
      logger.info(JSON.stringify(data));
    }
  };
};

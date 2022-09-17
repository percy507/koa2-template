import cors from '@koa/cors';
import koaJWT from 'koa-jwt';

import { pathWhiteList, uploadDir } from '@/config';
import { JWT_SCREAT } from '@/utils/constant';

import bodyParser from './bodyParser';
import errorHandler from './errorHandler';
import log from './log';
import responseHandler from './responseHandler';
import router from './router';

// 跨域处理
const mwCORS = cors({
  origin: '*',
  credentials: true,
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
});

// 验证 JWT
const mwJWT = koaJWT({
  secret: JWT_SCREAT,
}).unless({
  path: pathWhiteList,
});

// 解析请求参数
const mwBodyParser = bodyParser();

// 日志处理
const mwLogger = log();

// 统一返回格式
const mwResponseHandler = responseHandler();

// 错误处理
const mwErrorHandler = errorHandler();

// 路由处理
const mwRoute = router.routes();
const mwRouterAllowed = router.allowedMethods();

export default [
  mwCORS,
  mwJWT,
  mwBodyParser,
  mwLogger,
  mwResponseHandler,
  mwErrorHandler,
  mwRoute,
  mwRouterAllowed,
];

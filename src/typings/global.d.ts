import type * as Koa from 'koa';
import type { RouterContext } from 'koa__router';
import type { AnySchema } from 'joi';
import type { Logger } from 'tslog';
import { BUSINESS_CODE } from '@/utils/constant';

declare global {
  type ValueOf<T> = T[keyof T];
  type NODE_ENV = 'dev' | 'test' | 'prod';

  interface ResponseFormat {
    code: number;
    data: any;
    message: string;
  }

  interface RequestExtend {}

  interface ResponseExtend {
    success: (data: any, message?: string) => void;
    fail: (code: BUSINESS_CODE, message?: string) => void;
  }

  interface ExtendContext {
    log: Logger;
    req: RequestExtend;
    request: RequestExtend;
    res: ResponseExtend;
    response: ResponseExtend;
  }

  type KoaContext = RouterContext<any, ExtendContext>;
  type KoaMiddleware = Koa.Middleware<any, ExtendContext>;

  interface ParmSchema {
    query?: AnySchema;
    body?: AnySchema;
  }

  interface RouteSchema {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    paramSchema?: ParmSchema;
    handler: (ctx: KoaContext) => Promise<void>;
  }
}

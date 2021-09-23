import { BUSINESS_CODE } from '@/utils/constant';

export default (): KoaMiddleware => {
  return async (ctx, next) => {
    ctx.res.fail = (code, message = 'unknown error') => {
      ctx.body = { code, data: null, message };
    };

    ctx.res.success = (data, message = 'success') => {
      ctx.body = { code: BUSINESS_CODE.SUCCESS, data, message };
    };

    await next();
  };
};

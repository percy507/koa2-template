import { BUSINESS_CODE } from '@/utils/constant';

export default (): KoaMiddleware => {
  return async (ctx, next) => {
    try {
      // catch operate database error
      // catch custom throw error
      await next();
    } catch (err: any) {
      console.error('ErrorHandler middleware:', err);
      let code = BUSINESS_CODE.UNKNOWN_ERROR;
      if (err.code) code = err.code;
      ctx.res.fail(code, err.message);
    }
  };
};

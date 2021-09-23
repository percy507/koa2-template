import { BUSINESS_CODE } from '@/utils/constant';

export default (paramSchema: ParmSchema): KoaMiddleware => {
  return async function (ctx, next) {
    if (typeof paramSchema === 'object') {
      let validateResult;

      if (!validateResult && paramSchema.query) {
        validateResult = paramSchema.query.validate(ctx.request.query);
      }

      if (!validateResult && paramSchema.body) {
        validateResult = paramSchema.body.validate(ctx.request.body);
      }

      if (validateResult?.error) {
        ctx.throw(200, null, {
          code: BUSINESS_CODE.PARAMS_ERROR,
          message: validateResult.error.message,
        });
      }
    }

    await next();
  };
};

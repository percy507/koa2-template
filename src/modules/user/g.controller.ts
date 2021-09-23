import Jwt from 'jsonwebtoken';
import { JWT_SCREAT } from '@/utils/constant';
import { BUSINESS_CODE } from '@/utils/constant';
import { loginBodySchema } from './g.schema';

export const login: RouteSchema = {
  method: 'post',
  path: '/user/login',
  paramSchema: {
    body: loginBodySchema,
  },
  handler: async (ctx) => {
    const { phone, code } = ctx.request.body;

    if (phone === '17812341234' && code === '123456') {
      const token = Jwt.sign(
        {
          phone,
          code,
        },
        JWT_SCREAT,
        { expiresIn: '2h' }
      );

      ctx.res.success(token);
    } else {
      ctx.res.fail(BUSINESS_CODE.UNKNOWN_ERROR, 'Invalid phone or code');
    }
  },
};

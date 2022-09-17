import koaRouter from '@koa/router';

import { baseAPI } from '@/config';
import paramValidator from '@/middlewares/paramValidator';
import controllers from '@/modules';

const router = new koaRouter();

Object.keys(controllers).forEach((controllerKey: keyof typeof controllers) => {
  const controller = controllers[controllerKey];

  Object.keys(controller).forEach((itemKey: keyof typeof controller) => {
    const item = controller[itemKey];
    const { method, path, paramSchema, handler } = item as RouteSchema;
    // router[method](url, ...middlewares)
    router[method](baseAPI + path, paramValidator(paramSchema), handler);
  });
});

export default router;

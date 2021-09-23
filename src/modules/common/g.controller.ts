import koaSend from 'koa-send';
import { uploadDir } from '@/config';
import { getRepository } from 'typeorm';
import { Article } from '../article/g.entity';

// /v1/common/download/your-file.xxx
export const downloadFile: RouteSchema = {
  method: 'get',
  path: '/common/download/:fileName',
  paramSchema: {},
  handler: async (ctx) => {
    await koaSend(ctx, ctx.params.fileName, { root: uploadDir });
  },
};

export const uploadFile: RouteSchema = {
  method: 'post',
  path: '/common/upload',
  paramSchema: {},
  handler: async (ctx) => {
    console.log(ctx.request.ip);
    const { body = {}, files = {} } = ctx.request;
    const responseBody = { ...body };

    Object.keys(ctx.request.files || {}).forEach((key) => {
      const file = files[key];
      const value = [];

      if (Array.isArray(file)) {
        file.forEach((el) =>
          value.push({
            name: el.name,
            path: el.path,
          })
        );
      } else {
        value.push({
          name: file.name,
          path: file.path,
        });
      }

      responseBody[key] = value;
    });

    ctx.res.success({
      name: '上传结果',
      body: responseBody,
    });
  },
};

export const databaseError: RouteSchema = {
  method: 'get',
  path: '/common/databaseError',
  paramSchema: {},
  handler: async (_) => {
    await getRepository(Article)
      .createQueryBuilder()
      .insert()
      .values(null)
      .execute();
  },
};

export const customError: RouteSchema = {
  method: 'get',
  path: '/common/customError',
  paramSchema: {},
  handler: async (_) => {
    throw new Error("I'm custom error");
  },
};

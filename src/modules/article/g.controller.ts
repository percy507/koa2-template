import { getRepository } from 'typeorm';

import { BUSINESS_CODE } from '@/utils/constant';

import { Article } from './g.entity';
import {
  addArticleSchema,
  editArticleSchema,
  getArticleDetailSchema,
  getArticleListSchema,
} from './g.schema';

export const addArticle: RouteSchema = {
  method: 'post',
  path: '/article/add',
  paramSchema: {
    body: addArticleSchema,
  },
  handler: async (ctx) => {
    const result = await getRepository(Article)
      .createQueryBuilder()
      .insert()
      .values(ctx.request.body)
      .execute();

    if (result && result.generatedMaps.length === 1) {
      ctx.res.success(null);
    } else {
      ctx.res.fail(BUSINESS_CODE.UNKNOWN_ERROR, '未知异常');
    }
  },
};

export const editArticle: RouteSchema = {
  method: 'post',
  path: '/article/edit',
  paramSchema: {
    body: editArticleSchema,
  },
  handler: async (ctx) => {
    const result = await getRepository(Article)
      .createQueryBuilder()
      .update()
      .set(ctx.request.body)
      .where('id = :id', { id: ctx.request.body.id })
      .execute();

    if (result && result.affected === 1) {
      ctx.res.success(null);
    } else {
      ctx.res.fail(BUSINESS_CODE.UNKNOWN_ERROR, '文章不存在');
    }
  },
};

export const getArticleList: RouteSchema = {
  method: 'post',
  path: '/article/list',
  paramSchema: {
    body: getArticleListSchema,
  },
  handler: async (ctx) => {
    const { pageIndex, pageSize = 10 } = ctx.request.body;
    const result = await getRepository(Article)
      .createQueryBuilder('article')
      .orderBy('article.create_date', 'DESC') // 排序
      .select(['article.id', 'article.create_date', 'article.title', 'article.author']) // 获取部分列
      .skip(pageSize * (pageIndex - 1)) // 分页
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = result;
    const targetData = Array.isArray(list) ? list : [];

    ctx.res.success({
      list: targetData,
      total,
    });
  },
};

export const getArticleDetail: RouteSchema = {
  method: 'get',
  path: '/article/detail',
  paramSchema: {
    query: getArticleDetailSchema,
  },
  handler: async (ctx) => {
    const { id } = ctx.request.query;
    const result = await getRepository(Article)
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();

    if (result) {
      ctx.res.success(result);
    } else {
      ctx.res.fail(BUSINESS_CODE.UNKNOWN_ERROR, '未找到相关文章');
    }
  },
};

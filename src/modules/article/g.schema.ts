import Joi from 'joi';

import { getEnumValues } from '@/utils/parse';

import { ArticleType } from './g.entity';

const article = {
  title: Joi.string().min(5).max(20),
  author: Joi.string().min(2).max(10),
  // joi validate enum
  type: Joi.number().valid(...getEnumValues(ArticleType)),
  content: Joi.string(),
};

// 创建，所有字段均必填
export const addArticleSchema = Joi.object(article).fork(Object.keys(article), (schema) =>
  schema.required(),
);

// 编辑，所有字段均选填，id必填
export const editArticleSchema = Joi.object(article)
  .fork(Object.keys(article), (schema) => schema.optional())
  .keys({
    id: Joi.string().required(),
  });

// 列表页
// 分页、模糊查询、指定字段排序
export const getArticleListSchema = Joi.object(article)
  .fork(['title', 'author', 'type'], (schema) => schema.optional())
  .keys({
    pageIndex: Joi.number().required(),
    pageSize: Joi.number(),
  });

// 详情页
export const getArticleDetailSchema = Joi.object({
  id: Joi.string().required(),
});

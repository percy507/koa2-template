import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@/modules/common/g.entity';

export enum ArticleType {
  type1 = 1, // 类型1
  type2, // 类型2
  type3, // 类型3
}

@Entity('article')
export class Article extends BaseEntity {
  @Column({ comment: '文章标题', type: 'varchar', length: 100 })
  title: string;

  @Column({ comment: '作者', type: 'varchar', length: 20 })
  author: string;

  @Column({
    comment: '文章类型',
    type: 'enum',
    enum: ArticleType,
    default: ArticleType.type1,
  })
  type: ArticleType;

  @Column({ comment: '文章内容', type: 'varchar', length: 15000 })
  content: string;
}

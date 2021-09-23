import { Article } from './g.entity';
import {
  InsertEvent,
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
  /**
   * 表示此订阅者仅侦听 Article 事件。
   */
  listenTo() {
    return Article;
  }

  beforeInsert(event: InsertEvent<Article>) {
    console.info('[Article] Before insert:', event.entity);
  }

  beforeUpdate(event: UpdateEvent<Article>) {
    console.info('[Article] Before update:', event.entity);
  }
}

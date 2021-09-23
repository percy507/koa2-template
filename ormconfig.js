module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'myName',
  password: 'myPassword',
  database: 'koa2',
  synchronize: true, // 是否在每次应用程序启动时自动创建数据库架构。不要在生产环境中使用它，否则将丢失所有生产数据
  logging: false, // 是否启用日志记录
  entityPrefix: 'koa_', // 表前缀
  entities: ['dist/modules/**/*.entity.js'], // 要加载并用于此连接的实体
  subscribers: ['dist/modules/**/*.subscriber.js'], // 要加载并用于此连接的订阅者
};

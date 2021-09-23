### koa2-template

- Test koa2 + typescript!👨‍💻
- Learn some backend development pattern! 🤔

### 本地开发

```bash
# 装依赖
npm i pnpm -g
pnpm i

# 启动服务
pnpm dev

# mysql
mysqld --user=root
killall mysqld
```

### 核心依赖

```bash
@koa/router                 # 路由
koa-compose                 # 组合中间件
koa-body                    # 解析请求参数
@koa/cors                   # 跨域
log4js                      # 日志处理
joi                         # 灵活的参数校验
jsonwebtoken + koa-jwt      # 使用 JWT 鉴权
typeorm + mysql             # 数据库操作
module-alias                # 模块别名，主要是用于 resolve tsc 编译后的 paths
tslog                       # 优美的console.log
nodemon                     # 开发环境自动重启node应用
koa-send                    # 返回静态文件
```

> 可选择的尝试 🤪！
>
> - 使用 [`routing-controllers`](https://github.com/typestack/routing-controllers), 以装饰器模式写 controller。
> - 使用 [`class-validator`](https://github.com/typestack/class-validator)，基于装饰器的类的参数校验。本项目未使用这个，是因为我觉得这个库在校验一些比如 query 参数、分页参数、混合参数时不够灵活。

### 目录结构

```bash
# 部分关键目录
├── nodemon.json                      # nodemon 配置文件
├── .npmrc                            # npm 配置文件，这里主要用来设置npm源
├── package.json
├── tsconfig.json                     # typescript 配置文件
├── ormconfig.js                      # typeorm 配置文件
├── Insomnia_2021-09-23.har           # 自测api时，Insomnia工具导出的数据
├── .vscode
│   └── settings.json
└── src
    ├── main.ts                       # 入口文件
    ├── config                        # 配置文件目录
    ├── jobs                          # 高并发场景下队列处理？
    ├── tasks                         # 定时任务？
    ├── typings                       # 类型声明文件
    │   └── global.d.ts
    ├── middlewares                   # 中间件目录
    │   ├── bodyParser.ts             # 解析请求参数（json、formdata等）
    │   ├── responseHandler.ts        # 统一响应格式（请求成功、请求失败）
    │   ├── errorHandler.ts           # 统一错误处理
    │   ├── paramValidator.ts         # 校验请求参数（query、body）
    │   ├── router.ts                 # 路由
    │   ├── log.ts                    # 日志
    │   └── index.ts                  # 中间件集合(跨域、JWT验证、以及上面列出的)
    ├── utils
    │   ├── parse.ts
    │   └── constant.ts
    ├── scripts
    │   └── init.ts                   # 初始化脚本
    ├── modules                       # 业务模块目录
        ├── common                    # 通用业务模块
        ├── index.ts
        └── article                   # 业务模块---article （为了简单，前缀统一使用了`g.`）
            ├── g.subscriber.ts       # typeorm订阅者，用于侦听特定实体事件
            ├── g.schema.ts           # schema，用于joi校验请求参数
            ├── g.test.ts             # 测试文件
            ├── g.entity.ts           # typeorm实体文件，定义指定的数据库模型
            └── g.controller.ts       # 用于处理业务路由的相关操作
```

### typeorm 踩坑

- update 不存在的行，为什么不报错？

  - **SQL 是一种声明式的编程方式，除非是语法错误、权限不足、在数据库的层面有锁无法执行，否则都不认为是错误。**
  - 一般在执行完 sql 拿到结果后，再对结果再进行业务逻辑判断。

- 使用实体监听器和订阅者

  - 直接传入 `ctx.request.body` 进行更新操作，不会触发 @BeforeUpdate 监听器钩子，需要将 `ctx.request.body` 实例化为对应 model 再更新。但是这样好像就没法部分更新了，更新的时候会报错。（不推荐使用）
  - 另一种方案是：使用订阅者来监听更新操作。（推荐）[src/modules/article/g.subscriber.ts]

### TODO（有空再补）

- [ ] 增加 eslint、prettier、commitlint
- [ ] 增加接口文档
  - 考虑到现有的 controller 模式下，如何集成第三方文档工具？
- [ ] 增加测试用例？
  - 有哪些类型的测试？单元测试、压力测试...
- [ ] 如何调试？
- [ ] 生产环境如何打包？
- [ ] 日志最佳的记录格式？
- [ ] 异常有哪些类型，最佳的处理方式是？
  - 接口异常、参数验证异常、数据库操作异常等等
- [ ] 高并发场景下队列处理？jobs 目录
- [ ] 定时任务？tasks 目录
- [ ] nestjs 业务模块下文件的前缀命名为什么要跟目录名称一样呢？
  - 我暂时使用相同的前缀，因为方便复制粘贴...

### 参考资料

- [koa 实践总结，总有你用的到抄的走的](https://juejin.cn/post/6952665400890884127)
- [JSON Web Token 入门教程](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [nestjs 基础目录结构](https://juejin.cn/post/6844904192687996936)

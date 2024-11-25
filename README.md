# 简介

《Nest 通关秘籍》考试系统微服务项目练习。

# 启动

```bash
# 以下操作均在 pnpm workspace 根目录下执行

# 前端
pnpm dev:web

# 服务端
pnpm dev:server user/exam/answer/analyse
# 或者在 packages/server 下面有个 start.bat 双击它
```

# 部署

```bash
# 以下操作均在 pnpm workspace 根目录下执行

# 单独部署
# 前端
# 构建产物在 packages/web/dist，因为我配置了 gzip 压缩，所以 nginx 需要开启 gzip_static，或者可以关闭它
pnpm build:web

# 后端（需要使用 docker）
pnpm build:server

# 统一部署
pnpm build
```

# ps

本来一开始后端的数据库连接工具使用的是 prisma 的，但是在使用 docker-compose 做容器编排的时候老是连接不到 mysql，在容器实例里面 ip 可以 ping 通但就是连不上，可能是我菜吧，最后没法解决就换成 TypeORM 了，TypeORM 是没问题的很奇怪。

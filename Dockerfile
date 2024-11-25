# 指定基础镜像
FROM node:20.11.0-alpine3.18 AS base
RUN npm config set registry https://registry.npmmirror.com/
RUN npm i -g pnpm

# 基于上面定义的 base 镜像，对 pnpm workspace 中的 packages 进行构建
FROM base AS build
# 指定 /app 为工作目录
WORKDIR /app
# 将本地 pnpm workspace 工程中的代码拷贝到镜像中的 /app 工作目录
COPY . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# 将 pnpm workspace 中的所有 package 执行 build 操作
RUN pnpm run -r build
# pnpm deploy 表示使用 pnpm 包管理器执行部署操作
# 指定部署 server 包中的模块，并且只安装 production 环境下的依赖，部署在容器中的 /server 目录下
RUN pnpm deploy --filter=server --prod /server
# 指定部署 web 包中的模块
RUN pnpm deploy --filter=web --prod /web

# 基于上面定义的 base 镜像，对 server 模块进行构建
FROM base AS server
# 指定 /app 为工作目录
WORKDIR /app
# 将上面定义的 build 镜像中 server 模块的构建产物拷贝到 /app 工作目录
# COPY --from=build /server .
COPY --from=build /server/node_modules ./node_modules
COPY --from=build /server/dist ./dist
COPY --from=build /server/package.json /server/.env.production /server/ecosystem.config.js ./
# 设置时区，解决定时任务时间不准的问题
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm i -g pm2

EXPOSE 3001 3002 3003 3004

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

# 基于上面定义的 base 镜像，对 server 模块进行构建
FROM nginx:latest as web
# 指定 /app 为工作目录
WORKDIR /app
# 设置时区，解决定时任务时间不准的问题
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /web/dist /app/exam

EXPOSE 5173

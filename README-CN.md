# Idea

假设我们制作一个三维场景建模的合作平台

首先介绍一下社区 (Community) 的概念
- 一个社区可以是公开的, 任何人可以下载访问
    - 众包工程
    - 合作建模 (类似Minecraft)

- 也可以是闭合的, 有授权的用户才可以访问
    - 公司内部
    - 兴趣小组

每一个社区应该专注于构建一个场景，在构建场景的时候需要考虑到不同建模部分的如何整合，所以需要一份技术指南(Technical Specifiction, TS for short)

比如移动房子, 不同人建造不同部分，那么技术指南类似: 
- 门的长宽比
- 窗户的长宽比
- 每一个房间的长宽比


# 后端

后端提供的API连接和格式请在 [这里](src/utils/api.ts) 写，写完发 pull request

# 编译运行

运行 `yarn start` 或者 `npm run start`

编译 `yarn build` 或者 `npm run build`

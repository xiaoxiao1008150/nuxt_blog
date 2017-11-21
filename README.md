# nuxt + express pc端博客

#### PC访问

[博客地址](http://47.104.98.140:3000)

## 项目运行

clone项目源码
```
git clone git@github.com:xiaoxiao1008150/nuxt_blog.git
```
安装依赖
```
cd nuxt_blog
npm install/yarn install
```
运行

```
npm run dev
```
打开浏览器进入localhost:3000,查看效果

## 部分效果演示
![image](https://github.com/xiaoxiao1008150/nuxt_blog/raw/master/screenshot/index.gif)
![image](https://github.com/xiaoxiao1008150/nuxt_blog/raw/master/screenshot/admin.gif)

## 项目描述
### 技术栈
- nuxt
- axios：用于ajax请求
- es6: 使用es6语法
- express: restful api

### 功能实现
#### 静态页面部分
1. 首页: 文章列表的展示
2. 文档: 按时间年份划分文章
3. 侧边栏标签检索: 按文章的关键字进行文章检索
4. 详情页: 查看全文
5. 评论: 注册进行文章评论或者回复
#### 后台管理
1. 文章列表: 对所有文章进行更变删除
2. 添加文章: 新文章添加
3. 添加分类: 新分类添加
4. 修改密码: 修改登录密码


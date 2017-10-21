<template>
  <ul class="p_side">
    <li>
      <i class="iconfont b_icon">&#xe6f4;</i>
      <a href="/admin">文章列表</a>
    </li>
    <li>
      <i class="iconfont b_icon">&#xe6df;</i>
      <a href="/admin/addPost">添加文章</a>
      </li>
    <li>
      <i class="iconfont b_icon">&#xe6f5;</i>
      <a href="/admin/addCategory">添加分类</a>
    </li>
    <li>
      <i class="iconfont b_icon">&#xe709;</i>
      <a href="/admin/update">修改密码</a>
    </li>
  </ul>
</template>
<style>
.p_side li{
  height: 30px;
  line-height:30px;
  color:#678197;
  padding:3px 10px;
}
.p_side li:hover{
  cursor: pointer;
  background:rgba(103, 164, 213, 0.19);
  transition: 0.5s;
  color:#e5eff8;
}
.p_side li a,
.b_icon{
  vertical-align: middle;
}
.p_side li a {
  color:#1ba1e2;
}
.b_icon{
  font-size:14px;
  margin-right:3px;
}
</style>
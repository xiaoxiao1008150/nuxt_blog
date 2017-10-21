<template>
<nav class="nav_container">
 <div class="home left">
    <a href="/">主页</a>
 </div>
 <div class="manager right">
   <a href="/posts" >文档</a>
   <a href="/login">管理</a>
   <a href="/admin">admin</a>
 </div>
</nav>
</template>
<script>
</script>
<style scoped>
.nav_container{
  height:80px;
  line-height: 80px;
  background:rgba(54, 54, 59, 0.04);
  margin: 0 auto;
}
.nav_container a {
  font-size:18px;
  color:rgb(102, 102, 102);;
}
.home{
  margin-right:20px;
}
.manager a {
  margin: 0 10px;
}
</style>
<template>
<nav class="nav_container">
 <div class="home left">
    <a href="/">主页</a>
 </div>
 <div class="manager right">
   <a href="/posts" >文档</a>
   <a v-if="!$store.state.authUser" href="/login">管理</a>
   <a v-if="!$store.state.authUser" href="/admin">admin</a>
  <a v-if="$store.state.authUser" href="">欢迎{{ $store.state.authUser.username}}! </a>
  <a v-if="$store.state.authUser"  @click="logout">退出</a>
 </div>
</nav>
</template>
<script>
export default {
  methods: {
    async logout () {
      try {
        await this.$store.dispatch('logout')
        this.$nuxt.$router.push({path: '/'})
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
.nav_container{
  height:80px;
  line-height: 80px;
  background:rgba(54, 54, 59, 0.04);
  margin: 0 auto;
  padding:0 15px;
}
.nav_container a {
  font-size:18px;
  color:rgb(102, 102, 102);
}
.home{
  margin-right:20px;
}
.manager a {
  margin: 0 10px;
}
</style>
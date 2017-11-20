<template>
  <div class="c_container clearfix">
    <form class="login" @submit.prevent="login($event)">
      <h3>登录</h3>
      <div class="form_control">
        <label for="username">用户名</label>
        <input id="username" type="text" name="username" v-model.trim="formUsername">
      </div>
      <div class="form_control">
        <label for="password">密码</label>
        <input id="password" type="text" name="password" v-model.trim="formPassword">
      </div>
       <button id="login_btn" class="submit_button">登录</button>
    </form>
  </div>
</template>
<script>
export default {
  fetch ({ store, redirect }) {
    if (store.state.authUser) {
      return redirect('/admin')
    }
  },
  data () {
    return {
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })
        let name = this.$store.state.authUser.username
        if (name && name === 'admin') {
          this.$nuxt.$router.push({path: '/admin'})
          this.formUsername = ''
          this.formPassword = ''
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style>
.login{
  width:60%;
  margin:0 auto;
  text-align: center;
}
.login h3{
  font-size: 18px;
  line-height: 40px;
}
.form_control{
  margin-bottom: 20px;
}
.form_control input{
  width: 250px;
  padding: 3px 8px;
  border-radius: 4px;
  height:24px;
  line-height:24px;
  border:1px solid #ccc;
}
.form_control label{
  color:rgb(102, 102, 102);
  font-size: 16px;
  width:60px;
  text-align: justify;
  height: 30px;
  line-height: 30px;
  margin-right: 8px;
  display: inline-block;
}
</style>
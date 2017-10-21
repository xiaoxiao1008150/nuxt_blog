<template>
  <div class="c_container clearfix">
    <form class="login">
      <h3>登录</h3>
      <div class="form_control">
        <label for="username">用户名</label>
        <input id="username" type="text" name="username">
      </div>
      <div class="form_control">
        <label for="password">密码</label>
        <input id="password" type="text" name="password">
      </div>
    </form>
  </div>
</template>
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